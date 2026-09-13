"""Draw original, dependency-free SVG chemistry diagrams and audit their graphs.

The taught protonation states follow the supplied handout. Grey reference atoms
are excluded from side-chain formulas. Ring carbons use skeletal notation.
Run: python scripts/draw_structures.py
"""
from pathlib import Path
from collections import Counter
from math import hypot, sin, cos, pi
from html import escape
import json

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets' / 'structures'
INK, REF = '#254d59', '#91a2aa'
COLORS = {'N': '#3970aa', 'O': '#be5968', 'S': '#ac7929', 'Se': '#8260a4'}
FONT = 27


class Diagram:
    def __init__(self, code, name, expected, charge=0):
        self.code, self.name = code, name
        self.expected, self.charge = expected, charge
        self.nodes, self.bonds = {}, []

    def atom(self, id, x, y, element='C', h=0, charge=0, skeletal=False, reference=False, label=None):
        self.nodes[id] = dict(x=x, y=y, element=element, h=h, charge=charge,
                              skeletal=skeletal, reference=reference, label=label)
        return id

    def bond(self, a, b, order=1, reference=False):
        self.bonds.append(dict(a=a, b=b, order=order, reference=reference))

    def anchor(self, x, y):
        self.atom('alpha', x, y, '*', reference=True, label='Cα')

    def chain(self, points, labels, anchor=True):
        previous = 'alpha' if anchor else None
        for i, ((x, y), (el, h, charge)) in enumerate(zip(points, labels)):
            id = f'c{i}'
            self.atom(id, x, y, el, h, charge)
            if previous is not None:
                self.bond(previous, id, reference=(previous == 'alpha'))
            previous = id
        return previous

    def audit(self):
        counts, total_charge = Counter(), 0
        for id, atom in self.nodes.items():
            el = atom['element']
            if el == '*':
                continue
            valence = atom['h'] + sum(b['order'] for b in self.bonds if id in (b['a'], b['b']))
            expected_valence = {'C': 4, 'N': 4 if atom['charge'] == 1 else 3,
                                'O': 1 if atom['charge'] == -1 else 2,
                                'S': 2, 'Se': 2, 'H': 1}[el]
            assert valence == expected_valence, (self.code, id, valence, expected_valence)
            if not atom['reference']:
                counts[el] += 1
                counts['H'] += atom['h']
                total_charge += atom['charge']
        assert dict(counts) == self.expected, (self.code, dict(counts), self.expected)
        assert total_charge == self.charge, (self.code, total_charge, self.charge)
        return dict(code=self.code, name=self.name, atoms=dict(counts), charge=total_charge,
                    nodes=self.nodes, bonds=self.bonds)

    @staticmethod
    def label(atom):
        if atom['label'] is not None:
            return atom['label']
        if atom['skeletal']:
            return ''
        result = atom['element']
        if atom['h']:
            result += 'H' + (str(atom['h']).translate(str.maketrans('234', '₂₃₄')) if atom['h'] > 1 else '')
        if atom['charge']:
            result += '⁺' if atom['charge'] > 0 else '⁻'
        return result

    def draw(self):
        self.audit()
        width = max(a['x'] for a in self.nodes.values()) + 70
        height = max(a['y'] for a in self.nodes.values()) + 45
        svg = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">',
               f'<title id="title">{escape(self.name)} — {"full structure" if self.code == "G" else "side chain"}</title>',
               '<desc id="desc">Original vector drawing. Grey Cα marks the backbone attachment, not an extra side-chain carbon. Ring vertices are carbon atoms; hydrogens on skeletal carbons are implicit.</desc>']
        for b in self.bonds:
            a, z = self.nodes[b['a']], self.nodes[b['b']]
            dx, dy = z['x'] - a['x'], z['y'] - a['y']
            length = hypot(dx, dy)
            ux, uy = dx / length, dy / length
            def trim(atom):
                label = self.label(atom)
                if not label:
                    return 0
                weights = sum(.62 if c in '₂₃₄⁺⁻α' else 1 for c in label)
                hw, hh = weights * FONT * .32 + 5, FONT * .52 + 3
                return min(hw / abs(ux) if ux else 1e6, hh / abs(uy) if uy else 1e6)
            t1, t2 = trim(a), trim(z)
            assert length > t1+t2+8, (self.code, b, 'bond too short')
            x1, y1 = a['x']+ux*t1, a['y']+uy*t1
            x2, y2 = z['x']-ux*t2, z['y']-uy*t2
            color = REF if b['reference'] else INK
            offsets = [0] if b['order'] == 1 else [-3.2, 3.2]
            for off in offsets:
                inset = 3 if b['order'] == 2 and not self.label(a) and not self.label(z) else 0
                svg.append(f'<path d="M{x1-uy*off+ux*inset:.2f} {y1+ux*off+uy*inset:.2f} L{x2-uy*off-ux*inset:.2f} {y2+ux*off-uy*inset:.2f}" fill="none" stroke="{color}" stroke-width="2.6" stroke-linecap="round"/>')
        for a in self.nodes.values():
            label = self.label(a)
            if label:
                color = REF if a['reference'] else COLORS.get(a['element'], INK)
                svg.append(f'<text x="{a["x"]}" y="{a["y"]}" text-anchor="middle" dominant-baseline="central" font-family="Arial, Helvetica, sans-serif" font-size="{FONT}" font-weight="500" fill="{color}">{escape(label)}</text>')
        svg.append('</svg>')
        return '\n'.join(svg)+'\n'


diagrams = []
def new(code, name, expected, charge=0):
    d = Diagram(code, name, expected, charge)
    diagrams.append(d)
    return d


# Glycine: every atom, including both alpha hydrogens, is explicitly represented.
d = new('G', 'Glycine', {'C': 2, 'H': 5, 'N': 1, 'O': 2})
for id,x,y,el,h,q,label in [('n',60,125,'N',3,1,'H₃N⁺'),('a',155,125,'C',0,0,None),
                          ('h1',155,50,'H',0,0,None),('h2',155,200,'H',0,0,None),
                          ('c',240,125,'C',0,0,None),('o',240,205,'O',0,0,None),
                          ('om',330,125,'O',0,-1,None)]:
    d.atom(id,x,y,el,h,q,label=label)
for a,b,o in [('n','a',1),('a','h1',1),('a','h2',1),('a','c',1),('c','o',2),('c','om',1)]: d.bond(a,b,o)

# Aliphatic chains, with every side-chain carbon shown.
d = new('A','Alanine',{'C':1,'H':3});d.anchor(110,180);d.chain([(110,95)],[('C',3,0)])
d = new('V','Valine',{'C':3,'H':7});d.anchor(150,235);d.chain([(150,155)],[('C',1,0)])
for id,x in [('left',65),('right',235)]:d.atom(id,x,65,'C',3);d.bond('c0',id)
d = new('L','Leucine',{'C':4,'H':9});d.anchor(150,315);d.chain([(150,240),(150,160)],[('C',2,0),('C',1,0)])
for id,x in [('left',65),('right',235)]:d.atom(id,x,65,'C',3);d.bond('c1',id)
d = new('I','Isoleucine',{'C':4,'H':9});d.anchor(150,315);d.chain([(150,240),(225,155),(225,65)],[('C',1,0),('C',2,0),('C',3,0)])
d.atom('branch',65,155,'C',3);d.bond('c0','branch')
d = new('M','Methionine',{'C':3,'H':7,'S':1});d.anchor(150,335);d.chain([(150,265),(95,190),(150,120),(225,55)],[('C',2,0),('C',2,0),('S',0,0),('C',3,0)])

def benzyl(code,name,oh=False):
    d=new(code,name,{'C':7,'H':7,**({'O':1} if oh else {})})
    d.anchor(160,345 if oh else 290)
    shift=55 if oh else 0
    d.atom('ch2',160,215+shift,'C',2);d.bond('alpha','ch2',reference=True)
    # Six-membered ring, attachment at the bottom; OH opposite at the top.
    points=[(160,160+shift),(220,125+shift),(220,55+shift),(160,20+shift),(100,55+shift),(100,125+shift)]
    for i,(x,y) in enumerate(points):d.atom(f'r{i}',x,y,'C',0 if i==0 or (oh and i==3) else 1,skeletal=True)
    for i in range(6):d.bond(f'r{i}',f'r{(i+1)%6}',2 if i%2==0 else 1)
    d.bond('ch2','r0')
    if oh:d.atom('oh',160,15,'O',1);d.bond('r3','oh')
benzyl('F','Phenylalanine')
benzyl('Y','Tyrosine',True)

# Indole: C3 bears CH2, the five-membered ring has NH, the rings share an edge.
d=new('W','Tryptophan',{'C':9,'H':8,'N':1});d.anchor(245,330)
d.atom('ch2',245,255,'C',2);d.bond('alpha','ch2',reference=True)
points=[(170,70),(100,30),(30,70),(30,150),(100,190),(170,150)]
for i,(x,y) in enumerate(points):d.atom(f'b{i}',x,y,'C',0 if i in (0,5) else 1,skeletal=True)
for i in range(6):d.bond(f'b{i}',f'b{(i+1)%6}',2 if i in (0,2,4) else 1)
d.atom('n1',245,45,'N',1);d.atom('c2',295,115,'C',1,skeletal=True);d.atom('c3',245,185,'C',0,skeletal=True)
for a,b,o in [('b0','n1',1),('n1','c2',1),('c2','c3',2),('c3','b5',1),('c3','ch2',1)]:d.bond(a,b,o)

# Proline: show only the side chain and the two grey backbone attachment atoms.
d=new('P','Proline',{'C':3,'H':6});d.anchor(225,245)
d.atom('n',80,245,'N',1,reference=True);d.bond('alpha','n',reference=True)
d.atom('p0',265,140,'C',2);d.atom('p1',155,60,'C',2);d.atom('p2',45,140,'C',2)
for a,b in [('alpha','p0'),('p0','p1'),('p1','p2'),('p2','n')]:d.bond(a,b,reference=(a=='alpha'))

for code,name,el in [('S','Serine','O'),('C','Cysteine','S'),('U','Selenocysteine','Se')]:
    d=new(code,name,{'C':1,'H':3,el:1});d.anchor(120,220);d.chain([(120,145),(120,60)],[('C',2,0),(el,1,0)])
d=new('T','Threonine',{'C':2,'H':5,'O':1});d.anchor(150,235);d.chain([(150,150)],[('C',1,0)])
d.atom('oh',65,65,'O',1);d.atom('methyl',235,65,'C',3);d.bond('c0','oh');d.bond('c0','methyl')

for code,name,length,amide in [('N','Asparagine',1,True),('Q','Glutamine',2,True),('D','Aspartic acid',1,False),('E','Glutamic acid',2,False)]:
    expected={'C':length+1,'H':2*length+(2 if amide else 0),'O':1 if amide else 2}
    if amide:expected['N']=1
    d=new(code,name,expected,0 if amide else -1)
    d.anchor(150,240+75*(length-1))
    last=d.chain([(150,165+75*(length-1-i)) for i in range(length)],[('C',2,0)]*length)
    d.atom('carbonyl',150,90,'C');d.bond(last,'carbonyl')
    d.atom('o',235,35,'O');d.bond('carbonyl','o',2)
    d.atom('end',60,35,'N' if amide else 'O',2 if amide else 0,0 if amide else -1);d.bond('carbonyl','end')

d=new('K','Lysine',{'C':4,'H':11,'N':1},1);d.anchor(150,400)
d.chain([(150,330),(95,260),(150,190),(95,120),(150,40)],[('C',2,0)]*4+[('N',3,1)])
d=new('R','Arginine',{'C':4,'H':11,'N':3},1);d.anchor(175,405)
last=d.chain([(175,335),(115,270),(175,205),(115,140)],[('C',2,0)]*3+[('N',1,0)])
d.atom('guanidino',175,70,'C');d.bond(last,'guanidino')
d.atom('n_double',290,70,'N',2,1);d.bond('guanidino','n_double',2)
d.atom('n_single',100,20,'N',2);d.bond('guanidino','n_single')

# Histidinium, matching the positive form drawn in the course handout.
d=new('H','Histidine',{'C':4,'H':6,'N':2},1);d.anchor(90,330)
d.atom('ch2',90,255,'C',2);d.bond('alpha','ch2',reference=True)
for id,x,y,el,h,q,sk in [('c4',90,170,'C',0,0,True),('c5',90,85,'C',1,0,True),
                        ('n1',185,50,'N',1,1,False),('c2',240,130,'C',1,0,True),('n3',185,200,'N',1,0,False)]:
    d.atom(id,x,y,el,h,q,skeletal=sk)
for a,b,o in [('ch2','c4',1),('c4','c5',2),('c5','n1',1),('n1','c2',2),('c2','n3',1),('n3','c4',1)]:d.bond(a,b,o)


if __name__ == '__main__':
    OUT.mkdir(parents=True,exist_ok=True)
    reports=[]
    for d in diagrams:
        reports.append(d.audit())
        (OUT/f'{d.code}.svg').write_text(d.draw(),encoding='utf-8')
    assert len(diagrams)==21 and len({d.code for d in diagrams})==21
    (ROOT/'tests'/'structure-graphs.json').write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding='utf-8')
    print('PASS: 21 original SVG structures; all atom valences, side-chain formulas, and net charges checked.')

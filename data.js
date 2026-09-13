/* Structures are extracted from the user's course handout. Order follows the handout. */
window.AMINOS = [
 {name:'Glycine',three:'Gly',one:'G',zh:'甘胺酸',group:'nonpolar',formula:'H₃N⁺—CH₂—C(=O)—O⁻',tip:'唯一 R = H。α 碳接兩個氫，沒有手性；本題要畫完整主鏈。',check:'胺基 H₃N⁺、中央 CH₂、羧基 C(=O)O⁻ 都要畫出。'},
 {name:'Alanine',three:'Ala',one:'A',zh:'丙胺酸',group:'nonpolar',formula:'—CH₃',tip:'從 Glycine 的 H 換成最小的碳側鏈：一個甲基。',check:'一個 CH₃，直接接 α 碳。'},
 {name:'Valine',three:'Val',one:'V',zh:'纈胺酸',group:'nonpolar',formula:'—CH(CH₃)₂',tip:'V 像分岔的兩個短枝：從第一個側鏈碳就分成兩個甲基。',check:'第一個側鏈碳為 CH，連兩個 CH₃。'},
 {name:'Leucine',three:'Leu',one:'L',zh:'白胺酸',group:'nonpolar',formula:'—CH₂—CH(CH₃)₂',tip:'比 Valine 多走一格 CH₂ 才分岔。先直走，再分枝。',check:'α 碳後先接 CH₂，再接有兩個甲基的 CH。'},
 {name:'Isoleucine',three:'Ile',one:'I',zh:'異白胺酸',group:'nonpolar',formula:'—CH(CH₃)—CH₂—CH₃',tip:'與 Leucine 同碳數，但分枝提早到第一個側鏈碳。Ile 的第二個字母是小寫 l。',check:'第一個 CH 接一個甲基及一條 CH₂—CH₃。'},
 {name:'Methionine',three:'Met',one:'M',zh:'甲硫胺酸',group:'nonpolar',formula:'—CH₂—CH₂—S—CH₃',tip:'兩個 CH₂ 才到 S，硫後面還有 CH₃；不是末端 SH。',check:'兩個 CH₂、硫醚 S、末端 CH₃。'},
 {name:'Phenylalanine',three:'Phe',one:'F',zh:'苯丙胺酸',group:'nonpolar',formula:'—CH₂—phenyl',tip:'Alanine 接上苯環。Ph 的發音像 F，所以單字母用 F。',check:'一個 CH₂ 接苯環，環上沒有 OH。'},
 {name:'Tryptophan',three:'Trp',one:'W',zh:'色胺酸',group:'nonpolar',formula:'—CH₂—indol-3-yl',tip:'最大的一組融合雙環：一個六員環＋一個含 NH 的五員環。W 記成寬寬的雙環。',check:'CH₂ 接吲哚環 3 位；兩環共用一條邊，NH 在五員環內。'},
 {name:'Proline',three:'Pro',one:'P',zh:'脯胺酸',group:'nonpolar',formula:'—(CH₂)₃— ↩ 主鏈 N',tip:'側鏈繞回主鏈氮。P 記成把主鏈「綁住」的環。',check:'三個 CH₂ 接回主鏈 N，與 α 碳組成五員環。不能畫成開放的直鏈。'},
 {name:'Serine',three:'Ser',one:'S',zh:'絲胺酸',group:'polar',formula:'—CH₂—OH',tip:'一個 CH₂ 接 OH；與 Cysteine 比較，差在 O / S。',check:'CH₂ 後是羥基 OH。'},
 {name:'Threonine',three:'Thr',one:'T',zh:'蘇胺酸',group:'polar',formula:'—CH(OH)—CH₃',tip:'Serine 多一支 CH₃：同一個側鏈 CH 同時接 OH 和 CH₃。',check:'OH 在第一個側鏈碳，不是鏈的最末端。'},
 {name:'Cysteine',three:'Cys',one:'C',zh:'半胱胺酸',group:'polar',formula:'—CH₂—SH',tip:'Serine 的氧換成硫：OH → SH。單字母 C，不是 S。',check:'一個 CH₂ 接末端硫醇 SH。'},
 {name:'Tyrosine',three:'Tyr',one:'Y',zh:'酪胺酸',group:'polar',formula:'—CH₂—C₆H₄—OH（對位）',tip:'Phenylalanine 的苯環對面加 OH。tYrosine 記 Y。',check:'CH₂ 接苯環，OH 位在相對的對位（para）。'},
 {name:'Asparagine',three:'Asn',one:'N',zh:'天門冬醯胺',group:'polar',formula:'—CH₂—C(=O)—NH₂',tip:'Aspartic acid 的末端改為醯胺。AsparagiNe → N；只有一個 CH₂。',check:'一個 CH₂，再接 C(=O)NH₂；NH₂ 接在羰基碳上。'},
 {name:'Glutamine',three:'Gln',one:'Q',zh:'麩醯胺',group:'polar',formula:'—CH₂—CH₂—C(=O)—NH₂',tip:'比 Asparagine 多一個 CH₂。Gln 是醯胺；不要與 Glu 混淆。',check:'兩個 CH₂，再接 C(=O)NH₂。'},
 {name:'Aspartic acid',three:'Asp',one:'D',zh:'天門冬胺酸',group:'acidic',formula:'—CH₂—C(=O)—O⁻',tip:'酸性短鏈：一個 CH₂ 後接羧酸根。Asp / Asn 是酸與醯胺的配對。',check:'一個 CH₂，再接 COO⁻；依講義保留負電荷。'},
 {name:'Glutamic acid',three:'Glu',one:'E',zh:'麩胺酸',group:'acidic',formula:'—CH₂—CH₂—C(=O)—O⁻',tip:'比 Aspartic acid 多一個 CH₂。Glu / Gln 是酸與醯胺的配對。',check:'兩個 CH₂，再接 COO⁻。'},
 {name:'Lysine',three:'Lys',one:'K',zh:'離胺酸',group:'basic',formula:'—(CH₂)₄—NH₃⁺',tip:'長直鏈走四個 CH₂，末端才是 NH₃⁺。L 已給 Leucine，Lysine 用 K。',check:'四個 CH₂，末端 NH₃⁺；別少畫一格碳。'},
 {name:'Arginine',three:'Arg',one:'R',zh:'精胺酸',group:'basic',formula:'—(CH₂)₃—NH—C(=NH₂⁺)—NH₂',tip:'先走三個 CH₂，再到含三個氮的胍基。aRginine → R。',check:'三個 CH₂ 接 NH，再接帶三個氮的胍基；總側鏈電荷 +1。'},
 {name:'Histidine',three:'His',one:'H',zh:'組胺酸',group:'basic',formula:'—CH₂—imidazolyl（講義為 +1）',tip:'一個 CH₂ 接含兩個氮的五員環。講義畫的是帶正電的咪唑環。',check:'五員環有兩個 N，位置與雙鍵需對照圖。電荷採講義形式；實際質子化隨 pH 改變。'},
 {name:'Selenocysteine',three:'Sec',one:'U',zh:'硒半胱胺酸',group:'bonus',formula:'—CH₂—SeH',tip:'Cysteine 的 S 換成 Se；Sec / U 是第 21 種胺基酸的加分題。',check:'一個 CH₂ 接 SeH；Se 要兩個字母，不能寫成 S。'}
];
window.GROUPS = {nonpolar:{label:'非極性',color:'#bd8254'},polar:{label:'極性・不帶電',color:'#408b83'},acidic:{label:'酸性',color:'#b46481'},basic:{label:'鹼性',color:'#587cbb'},bonus:{label:'加分題',color:'#8971ad'}};


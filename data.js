/* Amino-acid data follows the course handout. Structures are original SVG diagrams. */
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

// Original memory aids, not etymologies or pronunciation guides.
window.MEMORY = {
 G:{hook:'「甘」願當最簡單的 G：側鏈只有 H。',parts:['Gly','cine'],three:'開頭三個字母 Gly。y 不要漏掉，別寫成 Gyl。',one:'Glycine → Gly → G，一路取開頭。'},
 A:{hook:'「阿蘭」Ala 拿著一個甲基，名牌就寫 A。',parts:['Ala','nine'],three:'Ala 就像「阿蘭」的名字牌；直接取前三個字母。',one:'Alanine → Ala → A。先把最直覺的 A 記牢。'},
 V:{hook:'「瓦力」Val 舉起 V 字手勢：側鏈也立刻分岔。',parts:['Val','ine'],three:'Val 是前三個字母；別與 Leu 混在一起。',one:'Valine 的 V，也像兩支短枝分開。'},
 L:{hook:'「留」Leu 一步再分岔：白胺酸先走一個 CH₂。',parts:['Leu','cine'],three:'Leu 三字母次序是 L-e-u，可唸口訣「留，Leu」。',one:'白胺酸 Leucine 用 L；Lysine 雖也以 L 開頭，代碼是 K。'},
 I:{hook:'「異」就是 Iso：在白胺酸 Leucine 前面加 Iso。',parts:['Iso','leu','cine'],three:'Ile 記成 I ＋ le（取自 leucine）；不是 Iso。中間是小寫 l，不是大寫 I。',one:'Isoleucine → I，看到「異白」先想到 Iso 的 I。'},
 M:{hook:'「美」Met 把硫藏中間，硫的兩邊都有碳。',parts:['Methio','nine'],three:'前三個字母 Met；完整名後面還有 hionine。',one:'Methionine → Met → M。硫在中間，不是末端 SH。'},
 F:{hook:'「苯」人搭飛機：飛想到 F，Ph 也發 /f/ 音。',parts:['Phenyl','alanine'],three:'前三字母 Phe，Ph 要一起留下；不是 Phe 的 P 當單字母。',one:'Ph 的 /f/ 音 → F。P 已是 Proline。'},
 W:{hook:'色彩繽紛的「旅行」trip，走過一座 W 形雙環橋。',parts:['Trypto','phan'],three:'從 TRyP 提出 T、r、p → Trp；不是 Try。',one:'W 記成 Wide，寬寬的融合雙環。這是圖像聯想。'},
 P:{hook:'「脯」Pro 是專業的 Pro，把自己繞成一個圈。',parts:['Pro','line'],three:'像英文「專業」pro，直接取 Pro。',one:'Proline → Pro → P；P 字本身也有一個圈。'},
 S:{hook:'一條彎彎的「絲」像 S，絲胺酸就是 Serine。',parts:['Ser','ine'],three:'Ser 是前三字母，s-e-r；不要寫成 Cys。',one:'絲 → S → Serine。S 是絲胺酸，不是「含硫就用 S」。'},
 T:{hook:'「蘇」先生數到 Three，先留下共同開頭 Thr。',parts:['Threo','nine'],three:'像 Three 的前三字母 Thr；不是 The，也不是 Tyr。',one:'Threonine 用 T；Tyrosine 把第二個字母 Y 拿走。'},
 C:{hook:'「半」個光圈像 C：半胱胺酸 Cysteine 用 C。',parts:['Cys','teine'],three:'Cys 就取前三字母；順序是 C-y-s。',one:'Cysteine → C。它有 SH，但 S 已代表 Serine。'},
 Y:{hook:'「酪」農舉起 Y 形叉子：tYrosine，第二個字母最醒目。',parts:['Tyro','sine'],three:'前三字母 Tyr；T-y-r，和 Thr 的 h 分清楚。',one:'tYrosine → Y。口訣「蘇 T、酪 Y」。'},
 N:{hook:'天門冬「醯胺」抱著 NH₂：短鏈醯胺，抓住 N。',parts:['Aspara','gine'],three:'As ＋ n：用 n 提醒末端醯胺有 N；與酸的 Asp 成對。',one:'AsparagiNe → N。短鏈那一對：酸 D、醯胺 N。'},
 Q:{hook:'「麩醯胺，Q 彈麵」：用 Q 彈這個畫面記住 Q。',parts:['Gluta','mine'],three:'Gl ＋ n → Gln，n 提醒醯胺的 N；不是酸的 Glu。',one:'Q 的尾巴記成多一格 CH₂：長鏈醯胺 Q，短鏈醯胺 N。'},
 D:{hook:'D 排在 E 前面：天門冬胺酸比較短，先到終點。',parts:['Aspar','tic acid'],three:'Aspartic 的前三字母 Asp；完整全名別漏 acid。',one:'酸性兩兄弟 D、E：D 短（1 個 CH₂），E 長（2 個 CH₂）。'},
 E:{hook:'E 比 D 多走一步：麩胺酸多一個 CH₂。',parts:['Gluta','mic acid'],three:'Glutamic 的前三字母 Glu；完整全名別漏 acid。',one:'酸 D E，D 短 E 長；不是看到 Glu 就填 G。'},
 K:{hook:'「離」開前拿 Key 鑰匙：離胺酸 Lysine 要拿 K。',parts:['Lys','ine'],three:'Lys 是前三字母，L-y-s；不能用 Leu。',one:'L 已給白胺酸 Leucine。口訣「白 L，離 K」，離開拿 Key。'},
 R:{hook:'「精」明的阿 R 哥：Arginine → Arg → R。',parts:['Argi','nine'],three:'前三字母 Arg，像「阿 R 哥」的名字牌。',one:'aRginine 抓第二個字母 R；A 已是 Alanine。'},
 H:{hook:'「組」一個讀歷史 History 的小組：His、H。',parts:['Histi','dine'],three:'Histidine 與 History 都從 His 開始。',one:'Histidine → His → H，一路取開頭。'},
 U:{hook:'「硒」有的第 21 位來賓：「原來是 U！」',parts:['Seleno','cys','teine'],three:'Se（硒的符號）＋ c（cysteine 的 c）→ Sec。',one:'U 記成 Unique，特別的加分來賓。C 是 Cysteine，Sec 是 U。'}
};


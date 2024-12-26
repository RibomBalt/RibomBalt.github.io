"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[4564],{5644:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>t,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var l=s(7275),r=s(4848),c=s(8453);const i={title:"TUCTF & Newport Blakes CTF Writeup",authors:"RibomBalt",tags:["CTF"]},t="2023.12.2 \u5468\u672bCTF\u7ec3\u4e60\uff08TUCTF & Newport Blakes CTF\uff09",a={authorsImageUrls:[void 0]},d=[{value:"TUCTF - keyboard cipher (crypto)",id:"tuctf---keyboard-cipher-crypto",level:2},{value:"TUCTF - PHP Practice (web)",id:"tuctf---php-practice-web",level:2},{value:"web/Inspector Gadget",id:"webinspector-gadget",level:2},{value:"web/walter&#39;s crystal shop",id:"webwalters-crystal-shop",level:2},{value:"web/secret tunnel",id:"websecret-tunnel",level:2},{value:"web/Galleria",id:"webgalleria",level:2},{value:"crypto/Caesar Salads",id:"cryptocaesar-salads",level:2},{value:"crypto/32+32=64",id:"crypto323264",level:2},{value:"crypto/Rivest Shamir forgot Adleman",id:"cryptorivest-shamir-forgot-adleman",level:2},{value:"crypto/SBG-ABW&#39;s Insanity (\u672a\u5b8c\u6210)",id:"cryptosbg-abws-insanity-\u672a\u5b8c\u6210",level:2},{value:"misc/do you hear that?",id:"miscdo-you-hear-that",level:2},{value:"misc/not accepted (\u672a\u5b8c\u6210)",id:"miscnot-accepted-\u672a\u5b8c\u6210",level:2},{value:"\u8d5b\u540e\u8865\u5145",id:"\u8d5b\u540e\u8865\u5145",level:4},{value:"misc/Myjail (\u672a\u5b8c\u6210)",id:"miscmyjail-\u672a\u5b8c\u6210",level:2},{value:"osint/persona (\u8d5b\u540e\u5b8c\u6210)",id:"osintpersona-\u8d5b\u540e\u5b8c\u6210",level:2},{value:"pwn-ribbit",id:"pwn-ribbit",level:2},{value:"pwn-heapnotes",id:"pwn-heapnotes",level:2},{value:"pwn-ret2thumb \uff08\u672a\u5b8c\u6210\uff09",id:"pwn-ret2thumb-\u672a\u5b8c\u6210",level:2},{value:"rev/crisscross",id:"revcrisscross",level:2},{value:"rev/itchyscratchy",id:"revitchyscratchy",level:2},{value:"rev/shifty-sands",id:"revshifty-sands",level:2},{value:"rev/two-step",id:"revtwo-step",level:2}];function o(e){const n={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h4:"h4",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,c.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:"Lysithea"}),"\n",(0,r.jsx)(n.p,{children:"\u5468\u672b\u6253\u4e86CTFtime\u770b\u5230\u7684\u7684\u4e24\u4e2a\u56fd\u5916CTF\uff08TU\u662f\u9ad8\u6821\u7684\uff0cNB\u597d\u50cf\u662f\u2026\u2026\u9ad8\u4e2d\u793e\u56e2\u7684\uff1f\uff09\u3002TUCTF\u663e\u5f97\u6bd4\u8f83\u8349\u53f0\u73ed\u5b50\uff08\u670d\u52a1\u5668\u7f51\u5de8\u5dee\u5c31\u4e0d\u8bf4\u4e86\uff0c\u751a\u81f3\u51fa\u73b0\u4e86pwn-welcome\u9898\u56e0\u4e3amovaps\u5bfc\u81f40 clear / xss\u9898\u5171\u4eab\u73af\u5883\u5bfc\u81f4\u9009\u624b\u4e92\u76f8\u6761\u4ef6\u7ade\u4e89\uff09\uff0cNBCTF\u5c31\u4e13\u4e1a\u5f88\u591a\uff0c\u4f46\u662f\u90e8\u5206\u9898\u76ee\u8003\u70b9\u96c6\u4e2d\u4e14\u504f\uff0c\u96be\u5ea6\u4e0d\u4f4e\u3002"}),"\n",(0,r.jsx)(n.p,{children:"\u4e0d\u6253\u7b97\u6240\u6709\u9898\u90fd\u5199WP\uff0c\u53ea\u6311\u6709\u8da3\u7684\u5199\u3002"}),"\n",(0,r.jsx)(n.h2,{id:"tuctf---keyboard-cipher-crypto",children:"TUCTF - keyboard cipher (crypto)"}),"\n",(0,r.jsx)(n.p,{children:"\u5bc6\u6587base16\u4e00\u8f6e\u89e3\u7801\u540e\u5f97\u5230\u8fd9\u4e2a\uff1a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"r5yG Ji7y XdV r5yG DrGv 0oL xDwA gY5R ZsC gYjN ZsQ jIlM aWdX kOp 1wA KoP YgJn\n"})}),"\n",(0,r.jsx)(n.p,{children:"\u6839\u636e\u6807\u9898\u63d0\u793a\uff0c\u8fd9\u4e9b\u5bf9\u5e94\u7f8e\u5f0f\u952e\u76d8\u4e0a\u6309\u952e\u4f4d\u7f6e\uff0c\u4e09/\u56db\u4e2a\u6309\u952e\u6846\u51fa\u4e00\u4e2a\u4f4d\u7f6e\u3002\uff08\u5982\u679c\u662f\u5fb7\u5f0fqzerty\u952e\u76d8\uff0c\u53ef\u600e\u4e48\u505a\u5462\uff1f\uff09"}),"\n",(0,r.jsx)(n.h2,{id:"tuctf---php-practice-web",children:"TUCTF - PHP Practice (web)"}),"\n",(0,r.jsxs)(n.p,{children:["PHP\u9875\u9762\uff0c\u53ef\u4ee5\u8bbf\u95ee\u5e76\u52a0\u8f7d\u4e00\u4e2a\u9875\u9762\uff0c\u6709\u5916\u7f51\uff0c\u4e5f\u80fd\u8d70",(0,r.jsx)(n.code,{children:"file://"}),", ",(0,r.jsx)(n.code,{children:"php://"}),"\u7b49\u534f\u8bae\u3002\u53ef\u4ee5\u8bfb\u53d6",(0,r.jsx)(n.code,{children:"/proc/self/environ"}),"\u73af\u5883\u53d8\u91cf\uff08\u7ed3\u679c\u597d\u50cf\u5305\u542b\u4e86\u6574\u4e2a\u6bd4\u8d5b\u6240\u6709\u9898\u76ee\u7684IP\u7aef\u53e3\uff0c\u60a8\u5b8c\u5168\u4e0d\u505a\u9694\u79bb\u662f\u5417\uff09\uff0c\u4e5f\u80fd\u8bfb\u5230",(0,r.jsx)(n.code,{children:"display.php"}),"\u6e90\u7801\u3002\u6838\u5fc3\u5728\u4e8e\u5982\u679c\u52a0\u8f7d\u8d44\u6e90\u4e0d\u662f\u56fe\u7247\uff08",(0,r.jsx)(n.code,{children:"getimagesize"}),"\uff09\uff0c\u4f1a\u7ecf\u8fc7htmlspecialchars\u505aescape\uff0c\u6240\u4ee5\u6ca1\u529e\u6cd5\u62fc\u51d1\u6728\u9a6c\u505aRCE\uff08\u5982\u679cRCE\u4e86\u6015\u662f\u80fd\u76f4\u63a5\u7ed9\u6bd4\u8d5b\u540e\u53f0\u5e72\u6389\uff0c\u6211\u5145\u5206\u76f8\u4fe1\uff09\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u6b63\u89e3\u662ffile\u534f\u8bae\u8bfb\u53d6",(0,r.jsx)(n.code,{children:".htaccess"}),"\uff0c\u53ef\u4ee5\u76f4\u63a5\u53d1\u73b0\u9690\u85cf\u7684flag\u6587\u4ef6\u3002\u867d\u7136http\u8bbf\u95ee\u4f1a\u88ab.htaccess\u9650\u5236\uff0c\u4f46file\u534f\u8bae\u4f3c\u4e4e\u4e0d\u7ba1\u8fd9\u4e2a"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"\u5269\u4e0b\u90fd\u662fNBCTF\u7684\uff0c\u4e0d\u6807\u6ce8\u4e86\nWeb\u6bd4\u8f83\u7b80\u5355\u6709\u8da3\uff0cpwn\u524d\u4e24\u4e2a\u8fd8\u6bd4\u8f83\u6b63\u5e38\u540e\u9762\u5168\u662fARM pwn\u5b8c\u5168\u4e0d\u4f1a\u3002rev\u6bd4\u8f83\u6b63\u5e38\u5730\u5f88\u96be\uff08wasm rev / rust rev\u662f\u7ed9\u4eba\u770b\u7684\u5417.jpg\uff09\u3002osint\u56e0\u4e3a\u4e0d\u60f3\u5728linkedin\u6ce8\u518c\u6240\u4ee5\u4e0d\u60f3\u505a\u3002crypto\u540e\u9762\u90fd\u662fRSA\u4ed9\u4eba\u3002misc/algo\u597d\u591a\u795e\u79d8oi\u9898\u3002\u603b\u4f53\u8bc4\u4ef7\u4e3a\u96be\u5ea6\u66f2\u7ebf\u6781\u5176\u9661\u5ced\u7684\u6bd4\u8d5b\u3002"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"webinspector-gadget",children:"web/Inspector Gadget"}),"\n",(0,r.jsx)(n.p,{children:"\u7f51\u7ad9\u722c\u53d6\u4fe1\u606f\u6536\u96c6\u3002flag\u88ab\u62c6\u6210\u56db\u4e2a\u90e8\u5206\u85cf\u5728\u4e0d\u540c\u4f4d\u7f6e"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u4e3b\u9875\u56fe\u7247\u7684alt\u5c5e\u6027\u6709\u4e00\u90e8\u5206"}),"\n",(0,r.jsx)(n.li,{children:"\u4e3b\u9875js\u6709\u4e2agetflag\u51fd\u6570\uff0c\u8df3\u8f6c\u5230\u4e00\u4e2a\u9690\u85cftxt"}),"\n",(0,r.jsx)(n.li,{children:"\u67d0\u4e2a\u5b50\u94fe\u63a5\u91cc\u9762\u6709\u4e00\u90e8\u5206"}),"\n",(0,r.jsx)(n.li,{children:"robots.txt\u91cc\u6709\u4e00\u90e8\u5206\uff08\u5dee\u70b9\u9519\u8fc7\u8fd9\u4e2a\uff09"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"webwalters-crystal-shop",children:"web/walter's crystal shop"}),"\n",(0,r.jsx)(n.p,{children:"nodejs+sqli\uff0c\u8fd8\u7ed9\u4e86\u5b8c\u6574\u6e90\u7801\uff0c\u5c31\u975e\u5e38\u65e0\u8111\u4e86\u3002"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"db.all(`SELECT * FROM crystals WHERE name LIKE '%${name}%'`, (err, rows) => { ...\n"})}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"LIKE"}),"\u67e5\u8be2\u65f6\u7528",(0,r.jsx)(n.code,{children:"%'"}),"\u95ed\u5408\u5b57\u7b26\u4e32\u8fd8\u662f\u6709\u70b9\u5bb9\u6613\u5ffd\u89c6\u7684\u3002"]}),"\n",(0,r.jsx)(n.h2,{id:"websecret-tunnel",children:"web/secret tunnel"}),"\n",(0,r.jsxs)(n.p,{children:["\u4e5f\u662f\u4e2a\u6709\u5916\u7f51\u7684\u6587\u4ef6\u5305\u542b\uff0c\u4e0d\u8fc7\u662fflask\uff0c\u800c\u4e14\u53ea\u80fd\u663e\u793a\u524d0x20\u4e2a\u5b57\u7b26\uff08flag\u6bd4\u8fd9\u4e2a\u77ed\uff09\u3002\u7ed9\u4e86\u6e90\u7801\uff0c\u73af\u5883\u6709\u4e24\u4e2a\u670d\u52a1\u5668\uff0cflag\u5728\u5185\u7f511337\u7aef\u53e3\u7684\u53e6\u4e00\u4e2a\u7f51\u7ad9\u4e0a\uff0c\u4f46\u662f\u524d\u7aef\u7f51\u7ad9\u505a\u4e86\u4e9b\u8fc7\u6ee4\uff0c\u8fc7\u6ee4\u4e86\u660e\u6587",(0,r.jsx)(n.code,{children:"flag"}),"\uff0c",(0,r.jsx)(n.code,{children:"x"}),"\uff0c",(0,r.jsx)(n.code,{children:"127"}),"\uff0c\u4e0d\u80fd\u5305\u542b\u8d85\u8fc7\u4e24\u4e2a",(0,r.jsx)(n.code,{children:"."}),"\u3002\u5e76\u4e14\u56e0\u4e3a\u7528\u7684requests\u5e93\uff0c\u4e0d\u80fd\u7528file\u534f\u8bae\u3002"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'@app.route("/fetchdata", methods=["POST"])\ndef fetchdata():\n    url = request.form["url"]\n\n    if "127" in url:\n        return Response("No loopback for you!", mimetype="text/plain")\n    if url.count(\'.\') > 2:\n        return Response("Only 2 dots allowed!", mimetype="text/plain")\n    if "x" in url:\n        return Response("I don\'t like twitter >:(" , mimetype="text/plain") \n    if "flag" in url:\n        return Response("It\'s not gonna be that easy :)", mimetype="text/plain")\n\n    try:\n        res = requests.get(url)\n    except Exception as e:\n        return Response(str(e), mimetype="text/plain")\n\n    return Response(res.text[:32], mimetype="text/plain")\n'})}),"\n",(0,r.jsxs)(n.p,{children:["\u6700\u540e\u76f4\u63a5\u7528URL\u7f16\u7801\u7ed5\u8fc7\u9ed1\u540d\u5355\uff0c",(0,r.jsx)(n.code,{children:"http://localhost:1337/%66lag"})]}),"\n",(0,r.jsx)(n.h2,{id:"webgalleria",children:"web/Galleria"}),"\n",(0,r.jsxs)(n.p,{children:["\u770b\u8d77\u6765\u6709\u6587\u4ef6\u4e0a\u4f20\u63a5\u53e3\uff08\u53ea\u80fd\u662f\u56fe\u7247\uff09\uff0c\u4f46\u56e0\u4e3a\u662fflask\u5f88\u96be\u63d2\u9a6c\u3002\u524d\u7aef\u6e32\u67d3\u8c03\u7528\u4e86\u4e00\u4e2a\u52a0\u8f7d\u56fe\u7247\u7684api\uff0c",(0,r.jsx)(n.code,{children:"?file="}),"\uff0c\u4f1a\u628a\u540e\u9762\u56fe\u7247\u540d\u79f0\u62fc\u63a5\u5728",(0,r.jsx)(n.code,{children:"uploads"}),"\u540e\u9762\uff0c\u7136\u540e\u7528",(0,r.jsx)(n.code,{children:"send_file"}),"\u4f20\u8f93\u6587\u4ef6\u3002\u8fd9\u91cc\u662f\u4f1a\u8fc7\u4e00\u4e2aWAF\u7684\uff0c\u4f1a\u7528",(0,r.jsx)(n.code,{children:"pathlib"}),"\u5206\u5272\uff0cneutralize\u6389",(0,r.jsx)(n.code,{children:".."}),",",(0,r.jsx)(n.code,{children:"."}),"\u3002"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:"@app.route('/gallery')\ndef gallery():\n    if request.args.get('file'):\n        filename = os.path.join('uploads', request.args.get('file'))\n        # check_file_path is to neutralize \"..\" and \".\" with pathlib\n        if not check_file_path(filename):\n            return redirect(url_for('gallery'))\n        return send_file(filename)\n"})}),"\n",(0,r.jsxs)(n.p,{children:["\u8fd9\u4e2a\u9898\u7528\u4e86\u4e00\u4e2a\u975e\u5e38\u7533\u5fc5\u7684",(0,r.jsx)(n.a,{href:"https://blog.csdn.net/qq_36078992/article/details/122070641",children:"\u7279\u6027"}),"\uff1a",(0,r.jsx)(n.code,{children:"os.path.join"}),"\u51fd\u6570\uff0c\u5f53\u7b2c\u4e8c\u4e2a\u53c2\u6570\u4e3a\u7edd\u5bf9\u8def\u5f84\u65f6\uff0c\u4f1a\u5ffd\u7565\u7b2c\u4e00\u4e2a\u53c2\u6570\uff0c\u7136\u540e\u5c31\u8def\u5f84\u7a7f\u8d8a\u4e86\uff1f\uff1f\uff1f\uff1f"]}),"\n",(0,r.jsxs)(n.p,{children:["\u5f53\u7136\u4e00\u822c\u4fdd\u9669\u505a\u6cd5\u662f",(0,r.jsx)(n.code,{children:"send_from_directory"}),"\u4f20\u8f93\u9759\u6001\u6587\u4ef6\uff0c\u8fd9\u662f\u6700\u540e\u4e00\u91cd\u4fdd\u9669\uff0c\u8fd9\u91cc\u4e5f\u6ca1\u6709\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u6240\u4ee5\u76f4\u63a5\u8bbf\u95ee",(0,r.jsx)(n.code,{children:"/gallery?file=/tmp/flag.txt"}),"\u5c31\u62ffflag\u4e86\u3002os.path.join\uff0c\u5f88\u795e\u5947\u5427\u3002"]}),"\n",(0,r.jsx)(n.h2,{id:"cryptocaesar-salads",children:"crypto/Caesar Salads"}),"\n",(0,r.jsx)(n.p,{children:"\u7b7e\u5230\u51ef\u6492"}),"\n",(0,r.jsx)(n.h2,{id:"crypto323264",children:"crypto/32+32=64"}),"\n",(0,r.jsxs)(n.p,{children:["\u7ed9\u4e86\u4e24\u4e2a\u6587\u4ef6\uff0c\u90fd\u662f\u5957\u5a03",(0,r.jsx)(n.code,{children:"|base64 -d"}),"\u5c31\u5b8c\u4e86"]}),"\n",(0,r.jsx)(n.h2,{id:"cryptorivest-shamir-forgot-adleman",children:"crypto/Rivest Shamir forgot Adleman"}),"\n",(0,r.jsxs)(n.p,{children:["\u7c7b\u4f3cRSA\uff0c\u4f46\u662f\u4f5c\u8005\u6545\u610f\u4e0d\u5c0f\u5fc3\u628a\u5e42\u6b21",(0,r.jsx)(n.code,{children:"**"}),"\u7ed9\u5199\u6210\u5f02\u6216",(0,r.jsx)(n.code,{children:"^"}),"\u4e86\uff0c\u7ed3\u679c\u5c31\u662f",(0,r.jsx)(n.code,{children:"(e^c)%n"}),"\u4e00\u6b65\u51fa\uff08\u53d8\u6210\u5bf9\u79f0\u52a0\u5bc6\u4e86\uff09"]}),"\n",(0,r.jsx)(n.h2,{id:"cryptosbg-abws-insanity-\u672a\u5b8c\u6210",children:"crypto/SBG-ABW's Insanity (\u672a\u5b8c\u6210)"}),"\n",(0,r.jsx)(n.p,{children:"\u4ece\u8fd9\u4e2a\u9898\u5f00\u59cbcrypto\u96be\u5ea6\u53d8\u5f97\u4e27\u5fc3\u75c5\u72c2\u3002"}),"\n",(0,r.jsxs)(n.p,{children:["\u8fd9\u4e2a\u9898\u524d\u534a\u90e8\u5206\u662f\u4e24\u7ec4RSA\u52a0\u5bc6\uff0c\u5171\u4eab\u8d28\u56e0\u6570p\uff0c\u4f46\u662f\u7ed9\u4e86m, e=11, c1, c2\uff0c\u6ca1\u7ed9n1, n2\u3002\u56e0\u4e3a",(0,r.jsx)(n.code,{children:"m**e"}),"\u53ef\u4ee5\u7b97\uff0c\u6240\u4ee5\u53ef\u4ee5\u5f97\u5230",(0,r.jsx)(n.code,{children:"k1 p q1"}),"\u548c",(0,r.jsx)(n.code,{children:"k2 p q2"}),"\uff0c\u6c42GCD\u53ef\u4ee5\u5f97\u5230p\uff0c\u8fdb\u800c\u5f97\u5230k1q1\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u540e\u534a\u90e8\u5206\u7528q1\u7684sha256\u4f5c\u4e3aAES-ECB\u7684key\uff0c\u6240\u4ee5\u5df2\u77e5k1q1\u5fc5\u987b\u7b97\u51faq1\uff0c\u76f8\u5f53\u4e8e\u4e00\u4e2a\u5927\u6574\u6570\u5206\u89e3\uff0c\u5176\u4e2d\u4e00\u4e2a\u8d28\u56e0\u6570\u5f88\u5927\uff081096bit\uff09\u3002\u5728",(0,r.jsx)(n.a,{href:"https://factordb.com",children:"factordb.com"}),"\u53ef\u4ee5\u5f97\u5230\u5176\u4e2d\u6bd4\u8f83\u5c0f\u7684\u51e0\u4e2a\u56e0\u6570\uff0c\u4f46\u662f\u6700\u540e\u4f3c\u4e4e\u8fd8\u5dee\u4e00\u4e2a\u5927\u7ea6\u662f",(0,r.jsx)(n.code,{children:"2**69"}),"\u8fd9\u4e48\u5927\u7684\u4e00\u4e2a\u8d28\u56e0\u6570\u5206\u4e0d\u51fa\u6765\uff08\u4e5f\u53ef\u80fd\u662f\u4e24\u4e2a\uff09\uff0c\u7206\u7834\u3001yafu\u7b49\u5de5\u5177\u4e5f\u641e\u4e0d\u5b9a\u3002AES\u6211\u4e0d\u8ba4\u4e3a\u53ef\u4ee5\u7b80\u5355\u7ed5\u8fc7\uff0c\u9274\u5b9a\u4e3a\u5bc4\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u90a3\u4e2a\u5de8\u5927\u7684\u6570\u662f\uff1a",(0,r.jsx)(n.code,{children:"1994841907166253555595565977017478085887329084880725018747951325992115875705370218202322214630728223048172383718977090965296009531272776521845483566167033031269338016789693088543541790629051269003822184012599810842070807948798980555276831576563670836568984652871999874061392371091033327265557380785506760057331398908817521964436164725366935857973626563"})]}),"\n",(0,r.jsx)(n.h2,{id:"miscdo-you-hear-that",children:"misc/do you hear that?"}),"\n",(0,r.jsx)(n.p,{children:"\u7b80\u5355\u56fe\u7247\u9690\u5199\uff0c\u663e\u7136\u5c3e\u90e8\u85cf\u4e86\u6570\u636e\uff0c\u662f\u4e2awav\u3002\u5728audacity\u91cc\u53d1\u73b0\u6ce2\u5f62\u5f88\u89c4\u5219\uff0c\u5728adobe audition\u91cc\u770b\u9891\u8c31\u53d1\u73b0\u662f\u6587\u5b57\u7684flag\u3002"}),"\n",(0,r.jsx)(n.h2,{id:"miscnot-accepted-\u672a\u5b8c\u6210",children:"misc/not accepted (\u672a\u5b8c\u6210)"}),"\n",(0,r.jsx)(n.p,{children:"\u600e\u4e48\u6709\u4eba\u5728CTF\u6bd4\u8d5b\u91cc\u585eOI\u9898\u554a\u771f\u4e0b\u5934"}),"\n",(0,r.jsx)(n.p,{children:"Case 4\u65e0\u8bba\u5982\u4f55\u90fdTime exceed\uff0c\u5168leak\u8981200\u6b21\uff0c\u7b97\u4e86\uff0c\u54b1\u4e0d\u5377\u8fd9\u4e2a\u4e86"}),"\n",(0,r.jsx)(n.h4,{id:"\u8d5b\u540e\u8865\u5145",children:"\u8d5b\u540e\u8865\u5145"}),"\n",(0,r.jsxs)(n.p,{children:["\u770b\u4e86\u4e00\u4e2a",(0,r.jsx)(n.a,{href:"https://www.youtube.com/watch?v=ibNhCi2Zw0g",children:"\u89c6\u9891Writeup"}),"\u3002\u539f\u6765\u8fd9\u4e2a\u9898\u7684flag\u53ea\u9700\u8981\u7ed9\u7b2c\u4e00\u4e2a\u9898\u63d0\u4ea4\u9519\u8bef\u7b54\u6848\u7136\u540e\u770bCheck Log\u554a\uff1f\uff1f\uff1f\u751a\u81f3\u4ed6\u5df2\u7ecf\u7ed9\u62111/3\u4e86\u6211\u90fd\u6ca1\u53bb\u770b\u3002\u8fd9\u4e48\u770b\u4e0b\u6765\u5c31\u7b97\u7b2c\u4e8c\u9898AC\u4e86\u5e94\u8be5\u4e5f\u662f\u7ed9hint\u5427\uff0c\u9006\u5929\u3002"]}),"\n",(0,r.jsx)(n.h2,{id:"miscmyjail-\u672a\u5b8c\u6210",children:"misc/Myjail (\u672a\u5b8c\u6210)"}),"\n",(0,r.jsx)(n.p,{children:"\u4e27\u5fc3\u75c5\u72c2\u7684python\u6c99\u7bb1\u9003\u9038\uff0c\u5305\u542bAST\u6c99\u7bb1\u3001audithook\u548cbuiltins\u8fc7\u6ee4\uff0c\u53ef\u7528\u7684\u4e1c\u897f\u5f88\u5c11\uff0c\u5e76\u4e14\u9650\u5236exec\u4e00\u884c4096\u5b57\u7b26\uff08\u7591\u4f3c\u662fTCP\u5355\u6b21\u5305\u6587\u4e0a\u9650\uff09"}),"\n",(0,r.jsx)(n.p,{children:"AST\u867d\u7136\u4e27\u5fc3\u75c5\u72c2\u4f46\u662f\u5df2\u77e5\u89c4\u5219\u662f\u80fd\u7ed5\u7684\uff0c\u4f46hook\u89e6\u53d1\u6761\u4ef6\u5b8c\u5168\u4e0d\u660e\uff0c\u770b\u8d77\u6765\u5b8c\u5168\u65e0\u6cd5\u5728python\u5185\u6253\u5f00\u6587\u4ef6\uff0c\u542f\u52a8\u5b50\u8fdb\u7a0b\u7b49\u3002\u6240\u4ee5\u4ee5\u540e\u6709\u673a\u4f1a\u7814\u7a76\u5427\u3002\u8c37\u6b4c\u5173\u952e\u8bcd\uff1apyjail"}),"\n",(0,r.jsx)(n.h2,{id:"osintpersona-\u8d5b\u540e\u5b8c\u6210",children:"osint/persona (\u8d5b\u540e\u5b8c\u6210)"}),"\n",(0,r.jsx)(n.p,{children:"\u559c\u95fb\u4e50\u89c1\u5f00\u76d2\u9898\uff0c\u53ea\u7ed9\u4e86\u4e00\u4e2a\u7528\u6237ID\uff1ain2win9945"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"twitter\u4e0a\u6709\u53f7\uff0c\u6709\u5206\u4eab\u67d0\u4e2a\u6253\u5b57\u7f51\u7ad9monkeytype\u7684\u9ad8\u5206\u8bb0\u5f55"}),"\n",(0,r.jsxs)(n.li,{children:["\u5728monkeytype\u4e0a\u80fd\u641c\u5230\u6b64\u4eba",(0,r.jsx)(n.a,{href:"https://monkeytype.com/profile/in2win9945",children:"\u4e3b\u9875"}),"\uff0c\u4e3b\u9875\u4e0a\u6709\u6307\u5411blogspot\u7684\u535a\u5ba2"]}),"\n",(0,r.jsxs)(n.li,{children:["\u5728\u5176profile\u80fd\u770b\u5230\u56fd\u7c4d(norway)\uff0c\u80fd\u770b\u5230\u53e6\u4e00\u4e2a\u540d\u4e3aKaspermellingencs\u7684",(0,r.jsx)(n.a,{href:"https://kaspermellingencs.blogspot.com/2023/11/job-hunting.html#comments",children:"blogspot\u535a\u5ba2"}),"\uff0c\u6709\u4e09\u7bc7\u6587\u7ae0\uff0c\u6700\u8fd1\u4e00\u7bc7\u8bf4\u4ed6\u4e3a\u4e86\u627e\u5de5\u4f5c\u5728Linkedin\u5efa\u7acb\u4e86\u81ea\u5df1\u7684\u4e3b\u9875"]}),"\n",(0,r.jsx)(n.li,{children:"\u7136\u540e\u7ebf\u7d22\u65ad\u4e86\uff0c\u56e0\u4e3a\u8c37\u6b4c\u6ca1\u641c\u51fa\u8fd9\u4e2a\u4eba\u7684Linkedin\u4e3b\u9875"}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"\u8d5b\u540e\u8865\u5145\uff1a"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Google\u592a\u62c9\u4e86\uff0cbing\u56fd\u9645\u7248\u76f4\u63a5\u51fa\u5f53\u4e8b\u4ebalinkedin\u52a8\u6001\u3002\u53e6\u5916\u6211\u5c45\u7136\u6ca1\u60f3\u5230Mellingen\u662f\u59d3\uff0cLinkedin\u4e3b\u9875\u53ef\u4ee5\u76f4\u63a5\u6309\u59d3\u540d\u67e5\u4eba\u7684\u3002"}),"\n",(0,r.jsx)(n.li,{children:"2023.12.5: web of archive \u80fd\u67e5\u5230\u90a3\u4e2a\u88ab\u5220\u4e86\u7684\u56fe\u7247\uff0c\u4f46\u90a3\u5929\u6211\u5c31\u662f\u6253\u4e0d\u5f00\uff0c\u6211\u4ee5\u4e3a\u662f\u6ca1\u6709\u722c\u53d6\u8bb0\u5f55\uff0c\u5410\u4e86\uff0c\u53ef\u80fd\u662f\u9009\u9879\u95ee\u9898\uff0c\u5f97\u4ece\u4e3b\u9875\u8fdb\u3002\u987a\u4fbf\u4e0d\u8981\u8ff7\u4fe1\u8c37\u6b4c\uff0c\u641c\u96c6\u4fe1\u606f\u4e5f\u8003\u8651bing\u548cduckduckgo"}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{src:s(1057).A+"",width:"892",height:"823"})}),"\n",(0,r.jsx)(n.h2,{id:"pwn-ribbit",children:"pwn-ribbit"}),"\n",(0,r.jsxs)(n.p,{children:["\u7b80\u5355\u7c97\u66b4\u7684",(0,r.jsx)(n.code,{children:"gets"}),"\u6808\u6ea2\u51fa\uff0c\u76ee\u6807\u8981\u7528ROP\u94fe\u5b9e\u73b0\u6307\u5b9a\u53c2\u6570\u8c03\u7528",(0,r.jsx)(n.code,{children:"win"}),"\u51fd\u6570\uff0c\u7a0b\u5e8f\u7edd\u5927\u90e8\u5206\u9759\u6001\u7f16\u8bd1\u3002\u7b2c\u4e8c\u4e2a\u53c2\u6570\u662f\u4e2achar[]\u9700\u8981\u548c\u4e24\u4e2a\u4e0d\u540c\u7684\u5b57\u7b26\u4e32\u8fdb\u884c\u6bd4\u8f83\uff0c\u4f46strcpy\u4f3c\u4e4e\u4e0d\u80fd\u7528\uff08\u672a\u77e5\u539f\u56e0\uff09\uff0c\u6240\u4ee5\u6211\u662f\u7528",(0,r.jsx)(n.code,{children:"gets"}),"\u89e3\u51b3\u7b2c\u4e8c\u4e2a\u53c2\u6570",(0,r.jsx)(n.code,{children:"strcmp"}),"\u4e24\u5904\u6bd4\u8f83\u7684\u3002\u4f3c\u4e4e\u4e5f\u53ef\u4ee5\u4e0d\u7ba1win\u51fd\u6570\u76f4\u63a5",(0,r.jsx)(n.code,{children:"ret2syscall"})]}),"\n",(0,r.jsx)(n.h2,{id:"pwn-heapnotes",children:"pwn-heapnotes"}),"\n",(0,r.jsx)(n.p,{children:"2.31\u5806\u9898\uff0c\u589e\u5220\u6539\u67e5\u90fd\u6709\uff0c\u800c\u4e14\u57fa\u672c\u6ca1\u4ec0\u4e48\u9650\u5236\u53ef\u4ee5\u968f\u610f\u5f15\u7528\u5220\u9664\u540e\u7684note\uff0c\u968f\u610fUAF\u3002\u7533\u8bf7\u7684chunk\u5927\u5c0f\u53ea\u80fd\u662f0x50\u5927\u5c0f\uff0c\u5e76\u4e14note\u4e0d\u80fd\u8d8a\u754c\u5199\u3002"}),"\n",(0,r.jsxs)(n.p,{children:["\u56e0\u4e3a2.31\u8fd8\u6ca1\u6709\u5f15\u5165tcache xor\u68c0\u67e5\uff0c\u6240\u4ee5\u53ea\u8981UAF\u628atcache\u6307\u9488\u6307\u5411\u4efb\u610f\u4f4d\u7f6e\u5373\u53ef\u65e0\u4ee3\u4ef7\u4efb\u610f\u8bfb\u5199\u3002\u9996\u5148\u628atcache bin\u76840xa0\u5bf9\u5e94\u7684count\u586b\u6ee1\u4e3a7\uff0c\u7136\u540e\u628a\u4e00\u4e2a\u5df2\u5206\u914d\u76840x50 trunk\u4fee\u6539\u5927\u5c0f\u6210\u4e3a0xa0\uff08extend\u52302\u500d\u5927\u5c0f\uff09\uff0c\u7136\u540efree\u6389\u5c31\u8fdb\u5165unsorted bin\uff0c\u6cc4\u9732main_arena\u8fdb\u800c\u5f97\u5230libc\u57fa\u5740\uff0c\u4e4b\u540e\u4fee\u6539",(0,r.jsx)(n.code,{children:"__malloc_hook"}),"\u5230\u76ee\u6807",(0,r.jsx)(n.code,{children:"win"}),"\u51fd\u6570\u5373\u53ef\u3002"]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:s(7054).A+"",children:"exp"})}),"\n",(0,r.jsx)(n.h2,{id:"pwn-ret2thumb-\u672a\u5b8c\u6210",children:"pwn-ret2thumb \uff08\u672a\u5b8c\u6210\uff09"}),"\n",(0,r.jsx)(n.p,{children:"\u4ece\u8fd9\u91cc\u5f00\u59cb\u5168\u662fARM\u4e86\uff0c\u5c1d\u8bd5\u4e86\u4e00\u4e0b\u7b2c\u4e00\u9898\u4f46\u662f\u6ca1\u8dd1\u901a\u3002"}),"\n",(0,r.jsxs)(n.p,{children:["ARM ROP\u53ef\u4ee5\u53c2\u8003\u4e9b\u7f51\u4e0a\u7684\u8d44\u6599\uff0cgadget\u4e0d\u592a\u4e00\u6837\uff0c\u7c7b\u4f3c\u4e8e",(0,r.jsx)(n.code,{children:"pop {fp, pc}"}),"\u8fd9\u6837\u7684\u547d\u4ee4\u53ef\u4ee5pop \u591a\u4e2a\u5bc4\u5b58\u5668\uff0c\u800cpop\u8fdbpc\u5b9e\u9645\u5c31\u662fret\u6307\u4ee4\u3002\u8c03\u7528\u7ea6\u5b9a\u4e5f\u4e0d\u592a\u4e00\u6837\uff0c\u4e00\u822c\u7528r0-r3\u4f20\u524d\u51e0\u4e2a\u53c2\u6570\uff0c\u7528r0\u8fd4\u56de\u3002\u4f3c\u4e4e\u6240\u6709arm\u6307\u4ee4\u90fd\u662f4\u4e2a\u5b57\u8282\uff0c\u4f46\u662f\u4f3c\u4e4eARM\u53ef\u4ee5\u8df3\u8f6c\u5230\u5947\u6570\u6307\u4ee4\uff0c\u5c31\u4f1a\u8fdb\u5165\u6240\u8c13thumb\u6307\u4ee4\u96c6\uff0c\u5730\u5740\u8868\u793a\u65b9\u6cd5\u4f3c\u4e4e\u4e5f\u4f1a\u53d1\u751f\u53d8\u5316\uff0c\u975e\u5e38\u795e\u5947\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u8fd9\u51e0\u4e2apwn\u4f3c\u4e4e\u6709",(0,r.jsx)(n.a,{href:"https://blog.csdn.net/weixin_46483787/article/details/134752187",children:"WP"}),"\u51fa\u6765\u4e86\uff0c\u53ef\u4ee5\u770b"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u8865\u5145\uff1a\u770b\u8fd9\u4e2a\u6bd4\u8d5b\u6574\u4f53\u96be\u5ea6\uff0c\u8fd9\u4e2a\u9898\u91cc\u9762\u662f\u6709shellcode\u7684\uff0c\u641cstrings\u80fd\u641c\u51fa",(0,r.jsx)(n.code,{children:"/bin/sh"}),"\uff0c\u53ea\u662fGhidra\u6ca1\u6709\u53cd\u7f16\u8bd1\uff0c\u53ea\u9700\u8981\u8df3\u8f6c\u5c31\u884c\u4e86\u3002\u4e0d\u8fc7\u4e3a\u4e86\u7cfb\u7edf\u5b66\u4e60\u8fd8\u662f\u7528ROP\u6253\u6bd4\u8f83\u597d"]}),"\n"]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"\u9006\u5411\u9898\u505a\u51fa\u591a\u5c11\u53d6\u51b3\u4e8e\u4f60\u60f3\u591a\u5927\u7a0b\u5ea6\u6298\u78e8\u81ea\u5df1"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"revcrisscross",children:"rev/crisscross"}),"\n",(0,r.jsx)(n.p,{children:"\u6bcf\u4e2a\u5b57\u8282\u7684\u5757\u52a0\u5bc6\uff0c\u7136\u540e\u6839\u636e\u5947\u5076\u4f1a\u628a\u8fde\u7eed\u4e24\u4e2a\u5b57\u8282\u653e\u5230\u76ee\u524d\u5df2\u77e5\u7684\u7b2c\u4e00\u4e2a/\u6700\u540e\u4e00\u4e2a\u3002\u5757\u5185\u662f\u4e24\u91cd\u7684\u8868\u52a0\u5bc6\uff0c\u5176\u4e2d\u4e00\u4e2a\u8868\u53ea\u670920\u4e2a\u5143\u7d20\u6240\u4ee5\u4e0d\u786e\u5b9a\u662f\u5426\u4e00\u5b9a\u53ef\u9006\uff1f\u4e0d\u8fc7flag\u8fd9\u7ec4\u7ed9\u7684\u662f\u6709\u552f\u4e00\u89e3\u7684\u3002"}),"\n",(0,r.jsx)(n.h2,{id:"revitchyscratchy",children:"rev/itchyscratchy"}),"\n",(0,r.jsx)(n.p,{children:"\u7b2c\u4e00\u6b21\u63a5\u89e6Scratch 3\u7adf\u662f\u5728CTF\u9006\u5411\u9898\u91cc\uff0c\u771f\u4e0d\u6127\u662f\u6e38\u620f\u5316\u7f16\u7a0b\u4ee3\u8868\u4f5c\u554a\uff0c\u611f\u89c9\u6bd4NS\u4e0a\u7684Game Builder Garage\u90fd\u8981\u597d\u73a9\u3002"}),"\n",(0,r.jsx)(n.p,{children:"Turbowarp\u7f51\u7ad9\u53ef\u4ee5\u5728\u7ebf\u67e5\u770b\u7f16\u8f91sb3\u4ee3\u7801\u3002\u5176\u5b9e\u4e5f\u662f\u975e\u5e38\u7b80\u5355\u7684\u8f93\u5165\u5bc6\u7801\u578b\u9006\u5411\uff0c\u903b\u8f91\u4e0d\u957f\u4e14\u975e\u5e38\u53ef\u89c6\u5316/\u6613\u5b66\uff08\u5c0f\u5b69\u5b50\u90fd\u80fd\u770b\u61c2\uff01\uff09\u3002\u5e38\u91cf\u6c60\u5728\u5de6\u4fa7\u641c\u7d22\u5bf9\u5e94\u53d8\u91cf\u70b9\u4e00\u4e0b\u5c31\u80fd\u770b\u5230\u4e86\u3002\u6ce8\u610f\u6570\u7ec4\u5bfb\u5740\u662f1\u5f00\u59cb\u7684\u3002"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{src:s(7483).A+"",width:"1619",height:"958"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:s(662).A+"",children:"rev"})}),"\n",(0,r.jsx)(n.h2,{id:"revshifty-sands",children:"rev/shifty-sands"}),"\n",(0,r.jsx)(n.p,{children:"\u8ff7\u5bab\u9006\u5411\u9898\uff0c\u8fd9\u4e2a\u9898\u7684trick\u5728\u4e8e\u6ca1\u6709\u56de\u663e\uff0c\u5e76\u4e14\u8ff7\u5bab\u5185\u90e8\u5206\u6807\u4e3aS\u7684\u6c99\u5b50\u662f\u968f\u56de\u5408\u79fb\u52a8\u7684\uff084\u56de\u5408\u4e3a\u4e00\u5468\u671f\uff09\uff0c\u9650\u5236\u4e86\u6700\u5927\u6b65\u6570\uff080x32\u6b65\uff09\u3002flag\u5230\u670d\u52a1\u5668\u4e0a\uff0cnc\u8fdb\u53bb\u73a9\u901a\u5173\u5c31\u7ed9flag\uff0c\u4f46\u672c\u5730\u548c\u8fdc\u7a0b\u7a0b\u5e8f\u4e00\u6837\u4e14\u6ca1\u6709\u968f\u673a\u8981\u7d20\u3002"}),"\n",(0,r.jsx)(n.p,{children:"\u6211\u7684\u73a9\u6cd5\u662f\u7528pwnlib\u8fde\u4e00\u4e2agdb\uff0c\u6bcf\u4e2a\u56de\u5408\u6253\u4e0a\u65ad\u70b9\uff0c\u8f93\u51fa\u5f53\u524d\u5750\u6807\u548c\u5730\u56fe\uff0c\u8fd9\u6837\u672c\u5730\u73a9\u7684\u65f6\u5019\u5c31\u77e5\u9053\u8fdb\u5ea6\u662f\u5426\u63a8\u8fdb\u4e86\uff0c\u7136\u540e\u56e0\u4e3a\u8ff7\u5bab\u76f8\u5f53\u6a21\u5757\u5316\uff0c\u5206\u6bb5\u968f\u4fbf\u8bd5\u4e00\u8bd5\u56fa\u5b9a\u7ec4\u5408\u901a\u8fc7\u5404\u4e2a\u96be\u70b9\uff0c\u8fde\u8d77\u6765\u5c31\u597d\u4e86\u3002"}),"\n",(0,r.jsxs)(n.p,{children:["\u867d\u7136\u6846\u67b6\u6ca1\u8bbe\u8ba1\u597d\uff0c\u6240\u4ee5\u597d\u50cf\u8f93\u51fa\u7684\u4f4d\u7f6e\u5e76\u975e\u662f\u5b9e\u9645\u4f4d\u7f6e\uff0c\u4f46\u80fd\u7528\u4e86\u3002",(0,r.jsx)(n.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:s(5656).A+"",children:"rev"})]}),"\n",(0,r.jsx)(n.h2,{id:"revtwo-step",children:"rev/two-step"}),"\n",(0,r.jsx)(n.p,{children:"\u540d\u4e3atwo-step\u5b9e\u4e3anine-step\uff0c\u8d85\u7ea7\u96c6\u90ae\u788e\u7247\u780d\u4e00\u5200\u5957\u5a03\u9006\u5411\u9898\uff0c\u7eaf\u7eaf\u6298\u78e8\uff0c\u4f46\u6211\u8fd8\u662f\u505a\u51fa\u6765\u4e86\u6211\u771f\u95f2\u554a\u3002"}),"\n",(0,r.jsx)(n.p,{children:"\u5bc6\u7801\u9006\u5411\u4e09\u79cd\u601d\u8def\u90fd\u8bd5\u4e86\u4e00\u904d\uff0c\u7ed3\u679c\u8fd8\u662f\u6700\u7b80\u5355\u7684\u65b9\u6cd5\u6700\u6709\u6548\uff1a"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"\u76f4\u63a5\u9006\u5411\u53cd\u7f16\u8bd1\u7a0b\u5e8f\u903b\u8f91"}),"\n",(0,r.jsx)(n.li,{children:"Z3\u7ea6\u675f\u6c42\u89e3\u3001angr\u7b26\u53f7\u6267\u884c\uff08\u6d6a\u8d39\u4e0d\u5c11\u65f6\u95f4\u8fd8\u59cb\u7ec8\u6ca1\u8c03\u901a\uff09"}),"\n",(0,r.jsx)(n.li,{children:"patch\u6e90\u7a0b\u5e8f\u3001gdb\u52a8\u6001\u8c03\u8bd5"}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["\u8fd9\u4e2a\u9898\u7684\u6846\u67b6\u6838\u5fc3\u5728\u4e8e\u51fd\u6570",(0,r.jsx)(n.code,{children:"0x401d0f"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-cpp",children:"char * FUN_00401d0f_getsplit(char *param_1)\n\n{\n  char *pcVar1;\n  long lVar2;\n  basic_ostream *this;\n  char *local_20;\n  long local_10;\n  \n  lVar2 = DAT_00404310_swi_a;\n  DAT_00404310_swi_a = DAT_00404310_swi_a + 1;\n  local_10 = (long)SHORT_ARRAY_00404090[lVar2];\n  pcVar1 = param_1;\n  while( true ) {\n    local_20 = pcVar1;\n    if (local_10 == 0) {\n      return local_20;\n    }\n    pcVar1 = local_20 + 1;\n    if ((*pcVar1 == '}') || (*pcVar1 == '\\0')) break;\n    if (*pcVar1 == '_') {\n      local_10 = local_10 + -1;\n      pcVar1 = local_20 + 2;\n    }\n  }\n  this = std::operator<<((basic_ostream *)std::cout,\"Aww shucks!\");\n  std::basic_ostream<>::operator<<((basic_ostream<> *)this,std::endl<>);\n                    /* WARNING: Subroutine does not return */\n  exit(1);\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["\u8fd9\u4e2a\u51fd\u6570\u6838\u5fc3\u529f\u80fd\u662f\u6309",(0,r.jsx)(n.code,{children:"_"}),"\u5206\u6bb5\uff0c\u5e76\u4e14\u6839\u636e\u4e00\u4e2a\u5168\u5c40\u53d8\u91cf",(0,r.jsx)(n.code,{children:"DAT_404310"}),"\u7684\u503c\u52a0\u4e00\u4e2ashort array\u51b3\u5b9a\u8fd9\u4e00\u6b21\u8c03\u7528\u8981\u7684\u662f\u54ea\u4e00\u6bb5\u3002\u6bcf\u6b21\u8fdb\u5165\u8fd9\u4e2a\u51fd\u6570\u8fd9\u4e2a\u503c\u90fd\u4f1a\u52a0\u4e00\u3002\u771f\u6b63checkflag\u7684\u51fd\u6570\u5206\u6563\u5728",(0,r.jsx)(n.code,{children:"0x401296"}),", ",(0,r.jsx)(n.code,{children:"0x4016c1"}),"\u4e24\u4e2a\u51fd\u6570\uff0c\u4e92\u76f8\u9012\u5f52\u8c03\u7528\uff0c\u7528",(0,r.jsx)(n.code,{children:"switch(DAT_404310)"}),"\u51b3\u5b9a\u8fdb\u5165\u7684\u5206\u652f\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u5728\u9010\u4e2a\u5206\u652f\u9006\u5411\u4e4b\u524d\uff0c\u6211\u8fd8\u8fdb\u884c\u4e86patch\uff0c\u5177\u4f53\u6765\u8bf4\u5c31\u662f\u628a\u8f93\u5165\u9519\u8bef\u7684\u63d0\u793a\u6362\u6210\u8f93\u51fa",(0,r.jsx)(n.code,{children:"DAT_404310"}),"\uff0c\u8fd9\u6837\u6211\u80fd\u77e5\u9053\u524d\u9762\u51e0\u8f6e\u662f\u6b63\u786e\u7684\u3002\u4e4b\u540e\u672c\u6765\u6253\u7b97\u76f4\u63a5\u57fa\u4e8e\u8fd9\u4e2a\u53d8\u91cf\u505a\u4fa7\u4fe1\u9053\uff0c\u540e\u6765\u7edd\u5927\u591a\u6570\u5206\u652f\u90fd\u662f4\u4e2a\u5b57\u7b26\u4ee5\u4e0a\uff0c\u904d\u5386\u65f6\u95f4\u592a\u4e45\uff0c\u8fd8\u662f\u7b97\u4e86\uff08\u4f46\u5176\u5b9e\u5373\u4f7f\u662f\u6bcf\u4e2a\u5206\u652f\u5185\u90e8\uff0c\u4e5f\u57fa\u672c\u4e0a\u662f\u6d41\u52a0\u5bc6\uff0c\u53ef\u80fd\u662fweak to timing attack\u7684\uff09\u3002\u67d0\u4e00\u4e2a\u5206\u652f\u53ea\u67092\u4e2a\u5b57\u7b26\uff0c\u662f\u53ef\u4ee5\u7528\u8fd9\u4e2a\u65b9\u6cd5\u7206\u51fa\u6765\u7684\u3002"]}),"\n",(0,r.jsx)(n.p,{children:"\u7136\u540e\u6bcf\u4e2a\u5206\u652f\u5185\u90e8\u6211\u8fd8\u5c1d\u8bd5\u7528z3/angr\u6c42\u89e3\uff0c\u4f46\u662fangr\u600e\u4e48\u4e5f\u8dd1\u4e0d\u901a\uff0c\u4f3c\u4e4e\u662f\u5e38\u91cf\u4f20\u4e0d\u8fdb\u53bb\u3002z3\u5f04\u4e86\u534a\u5929\u4e0d\u61c2\u8bed\u6cd5\uff0c\u4f3c\u4e4ez3\u8981xor\u5e38\u6570\u8fd8\u633a\u9ebb\u70e6\u7684\uff0c\u4ee5\u540e\u6709\u7a7a\u518d\u5b66\u5427\u3002"}),"\n",(0,r.jsx)(n.p,{children:"\u56e0\u800c\u5927\u591a\u6570\u5206\u652f\u6211\u662f\u624b\u52a8\u6c42\u89e3\u7684\uff0c\u6ca1\u6709\u7279\u522b\u590d\u6742\u7684\u52a0\u5bc6\uff0c\u57fa\u672c\u90fd\u662f\u9010\u5b57\u8282\u6d41\u52a0\u5bc6\uff0c\u7e41\u7410\u65e0\u8da3\u3002\u5217\u4e00\u4e0b\u51e0\u4e2a\u6709\u610f\u601d\u7684\uff1a"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"3\u548c4\u4e24\u4e2a\u5206\u652f\u662f\u4e00\u8d77\u51fa\u7684\uff0c\u5373\u4e58\u4ee50x80\u76f8\u52a0\u5408\u5e76\u4e3a\u4e00\u4e2a\u53d8\u91cf\uff0c3\u91cc\u6ca1\u6709\u5224\u65ad\uff0c\u53ea\u57284\u91cc\u6709\u3002"}),"\n",(0,r.jsx)(n.li,{children:"\u5206\u652f6\u5c31\u662f\u90a3\u4e2a2\u4e2a\u5b57\u8282\u7684\uff0c\u6211\u76f4\u63a5\uff08\u4f2a\uff09\u4fa7\u4fe1\u9053\u7206\u7834\u4e86"}),"\n",(0,r.jsxs)(n.li,{children:["\u5206\u652f7\u662f\u548c\u4e00\u4e2adouble\u6bd4\u8f83\uff0cghidra\u53ef\u4ee5\u76f4\u63a5\u770b\u8f6c\u6362\u6210",(0,r.jsx)(n.code,{children:"char[]"}),"\u662f\u4ec0\u4e48"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-cpp",children:"case 7:\n    pdVar4 = (double *)FUN_00401d0f_getsplit(param_1);\n    DAT_00404308 = *pdVar4;\n    if ((DAT_00404308 == 3.325947034342098e+151) &&\n        (cVar1 = FUN_00401296_checkbase(param_1), cVar1 != '\\0')) {\n        uVar5 = 1;\n    }\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u5206\u652f8\u6bd4\u8f83\u6709\u8da3\uff0c\u5bf9\u4e8e\u6bcf\u4e2a\u5b57\u8282\u548c\u4e00\u4e2a\u8868\u5f02\u6216\u540e\u653e\u5230\u6808\u4e0a\uff0c\u7136\u540e\u76f4\u63a5",(0,r.jsx)(n.code,{children:"call rax"}),"\u6267\u884cshellcode\uff08\u9006\u5230\u8fd9\u91cc\u6211\u624dchecksec\u4e86\u4e00\u4e0b\u53d1\u73b0\u8fd8\u771f\u662f\u4e0d\u5e26NX\u6709RWX\u7684\uff0c\u60ca\u4e86\uff09\u3002\u56e0\u4e3a\u53ea\u80fd\u63a7\u5236shellcode\u4e00\u4e2a\u5b57\u8282\uff0c\u6240\u4ee5\u6700\u597d\u7684\u8ba9\u7a0b\u5e8f\u4e0d\u62a5\u9519\u7684\u65b9\u6cd5\u5c31\u662f\u76f4\u63a5",(0,r.jsx)(n.code,{children:"ret"}),"\u8fd4\u56de\uff0c\u6240\u4ee5\u8fd96\u6b21\u8c03\u7528\u7684",(0,r.jsx)(n.code,{children:"shellcode"}),"\u9700\u8981\u662f",(0,r.jsx)(n.code,{children:"c3"}),"\u3002\u8fd9\u4e00\u8f6e\u9006\u51fa\u6765\u788e\u7247\u662f",(0,r.jsx)(n.code,{children:"return"}),"\uff0c\u8fd8\u633a\u6709\u521b\u610f\u7684\u4e0d\u5f97\u4e0d\u8bf4"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-cpp",children:"case 8:\n    lVar3 = FUN_00401d0f_getsplit(param_1);\n    for (local_a8 = 0; local_a8 < 6; local_a8 = local_a8 + 1) {\n        local_12 = CONCAT11(local_12._1_1_,(byte)local_88[local_a8] ^ *(byte *)(local_a8 + lVar3));\n        (*(code *)&local_12)();\n    }\n    uVar4 = 1;\n"})})]})}function h(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}},7054:(e,n,s)=>{s.d(n,{A:()=>l});const l=s.p+"assets/files/exp-6cac3bede2a7d25a01ac763b1a24be9f.py"},662:(e,n,s)=>{s.d(n,{A:()=>l});const l=s.p+"assets/files/pseudo-be1b908c701102d4be4baf9771c6728a.py"},5656:(e,n,s)=>{s.d(n,{A:()=>l});const l=s.p+"assets/files/rev_sands-01277ff16da4ff35684cb19905d00102.py"},1057:(e,n,s)=>{s.d(n,{A:()=>l});const l=s.p+"assets/images/flag-a3acd8ba226554aa1f5373e94a5221ed.png"},7483:(e,n,s)=>{s.d(n,{A:()=>l});const l=s.p+"assets/images/game-1b7a2de065a32149829919438a2c969a.png"},8453:(e,n,s)=>{s.d(n,{R:()=>i,x:()=>t});var l=s(6540);const r={},c=l.createContext(r);function i(e){const n=l.useContext(c);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),l.createElement(c.Provider,{value:n},e.children)}},7275:e=>{e.exports=JSON.parse('{"permalink":"/ctf-writeup/2023/12/05/NBCTF2023","source":"@site/ctf/2023-12-05-NBCTF2023/index.md","title":"TUCTF & Newport Blakes CTF Writeup","description":"Lysithea","date":"2023-12-05T00:00:00.000Z","tags":[{"inline":false,"label":"CTF","permalink":"/ctf-writeup/tags/ctf","description":"Catch-The-Flag contests writeups / learning notes"}],"readingTime":17.45,"hasTruncateMarker":true,"authors":[{"name":"Lysithea","title":"CTF enthusiastist. Usual teamname: Lysithea, Ribom, RibomBalt","email":"ribombalt1@gmail.com","page":{"permalink":"/ctf-writeup/authors/RibomBalt"},"socials":{"github":"https://github.com/RibomBalt","stackoverflow":"https://stackoverflow.com/users/RibomBalt","ctftimes":"https://ctftime.org/team/282941"},"imageURL":"https://github.com/RibomBalt.png","key":"RibomBalt"}],"frontMatter":{"title":"TUCTF & Newport Blakes CTF Writeup","authors":"RibomBalt","tags":["CTF"]},"unlisted":false,"prevItem":{"title":"0CTF 2023 Writeup","permalink":"/ctf-writeup/2023/12/21/0CTF2023"},"nextItem":{"title":"TPCTF 2023 (\u6e05\u5317CTF) Writeup","permalink":"/ctf-writeup/2023/11/28/TPCTF2023"}}')}}]);
LONG_SCRIPT = "\u0089\u009a\u0081\u008c\u009b\u0086\u0080\u0081\u00cf\u008c\u0087\u008a\u008c\u0084\u0089\u0083\u008e\u0088\u00dd\u00c7°\u00df\u0097\u008e\u00d7\u00dc\u008a\u0097\u00dd\u00c6\u0094\u0099\u008e\u009d\u00cf°\u00df\u0097\u00d8\u00dd\u00db\u008d\u00d2´\u00c8\u008c\u0087\u008e\u009d¬\u0080\u008b\u008a®\u009b\u00c8\u00c3\u00c8\u0082\u008e\u009f\u00c8\u00c3\u00c8\u00c8\u00c3\u00c8\u009c\u009f\u0083\u0086\u009b\u00c8\u00c3\u00c8\u009c\u009b\u009d\u0086\u0081\u0088\u0086\u0089\u0096\u00c8\u00c3\u00c8¬\u0080\u009d\u009d\u008a\u008c\u009b\u00c8\u00c3\u00c8¸\u009d\u0080\u0081\u0088\u00c8\u00c3\u00c8\u0085\u00c2\u00c8²\u00d4\u009d\u008a\u009b\u009a\u009d\u0081\u00cf\u00c7¥¼ ¡´°\u00df\u0097\u00d8\u00dd\u00db\u008d´\u00db²²\u00c7°\u00df\u0097\u008e\u00d7\u00dc\u008a\u0097\u00dd´°\u00df\u0097\u00d8\u00dd\u00db\u008d´\u00dc²²\u00c7°\u00df\u0097\u00d8\u00dd\u00db\u008d´\u00dd²\u00c6´°\u00df\u0097\u00d8\u00dd\u00db\u008d´\u00de²²\u00c7\u0089\u009a\u0081\u008c\u009b\u0086\u0080\u0081\u00c7°\u00df\u0097\u008e\u00d7\u00dc\u008a\u0097\u00dc\u00c6\u0094\u009d\u008a\u009b\u009a\u009d\u0081\u00cf°\u00df\u0097\u008e\u00d7\u00dc\u008a\u0097\u00dc´°\u00df\u0097\u00d8\u00dd\u00db\u008d´\u00df²²\u00c7\u00df\u00c6\u0092\u00c6\u00c6\u00d2\u00d2\u00cf¥¼ ¡´°\u00df\u0097\u00d8\u00dd\u00db\u008d´\u00db²²\u00c7´\u00df\u00c3\u00de\u00da\u00c3\u00de\u00d9\u00c3\u00de\u00d8\u00c3\u00dc\u00df\u00c3\u00de\u00df\u00da\u00c3\u00de\u00d9\u00c3\u00dc\u00de\u00c3\u00de\u00d9\u00c3\u00d9\u00d8\u00c3\u00dc\u00c3\u00dc\u00dc\u00c3\u00da\u00c3\u00d9\u00df\u00c3\u00db\u00c3\u00de\u00df\u00d9\u00c3\u00d9\u00c3\u00db\u00de\u00c3\u00df\u00c3\u00de\u00c3\u00d9\u00d8\u00c3\u00dc\u00c3\u00de\u00d9\u00c3\u00db\u00c3\u00d9\u00c3\u00dc\u00dc\u00c3\u00dd\u00dc\u00dd²´°\u00df\u0097\u00d8\u00dd\u00db\u008d´\u00de²²\u00c7\u0089\u009a\u0081\u008c\u009b\u0086\u0080\u0081\u00c7°\u00df\u0097\u008e\u00d7\u00dc\u008a\u0097\u00dc\u00c6\u0094\u009d\u008a\u009b\u009a\u009d\u0081\u00cf\u00c7\u008c\u0087\u008a\u008c\u0084\u0089\u0083\u008e\u0088\u00dd\u00c4\u00cf°\u00df\u0097\u00d8\u00dd\u00db\u008d´\u00dd²\u00c6´°\u00df\u0097\u00d8\u00dd\u00db\u008d´\u00df²²\u00c7°\u00df\u0097\u008e\u00d7\u00dc\u008a\u0097\u00dc\u00c6\u0092\u00c6\u00c6\u00d0°\u00df\u0097\u00d8\u00dd\u00db\u008d´\u00da²\u00d5°\u00df\u0097\u00d8\u00dd\u00db\u008d´\u00d9²\u00c6\u0092"

def solve_unicode_str(s):
    res_list = [chr(ord(c)^0xef) for c in s]
    return ''.join(res_list)

# print(solve_unicode_str(LONG_SCRIPT))
SCRIPT_res = "function checkflag2(_0xa83ex2){var _0x724b=['charCodeAt','map','','split','stringify','Correct','Wrong','j-'];return (JSON[_0x724b[4]](_0xa83ex2[_0x724b[3]](_0x724b[2])[_0x724b[1]](function(_0xa83ex3){return _0xa83ex3[_0x724b[0]](0)}))== JSON[_0x724b[4]]([0,15,16,17,30,105,16,31,16,67,3,33,5,60,4,106,6,41,0,1,67,3,16,4,6,33,232][_0x724b[1]](function(_0xa83ex3){return (checkflag2+ _0x724b[2])[_0x724b[0]](_0xa83ex3)}))?_0x724b[5]:_0x724b[6])}"
index_list = [0, 15, 16, 17, 30, 105, 16, 31, 16, 67, 3, 33, 5, 60, 4, 106, 6, 41, 0, 1, 67, 3, 16, 4, 6, 33, 232]
flag2 = ''.join([SCRIPT_res[i] for i in index_list])
print(flag2)

import base64
import re
AFTER_ROT = "MzkuM8gmZJ6jZJHgnaMuqy4lMKM4"
def rot13a5d(c):
    if re.match('\\d', c):
        r = ord(c) + 5
        if r > ord('9'):
            r -= 10
    elif re.match('[a-z]',c):
        r = ord(c) + 13
        if r > ord('z'):
            r -= 26
    elif re.match('[A-Z]',c):
        r = ord(c) + 13
        if r > ord('Z'):
            r -= 26
    return chr(r)
flag1 = base64.b64decode(''.join([rot13a5d(c) for c in AFTER_ROT]).encode())
print(flag1)
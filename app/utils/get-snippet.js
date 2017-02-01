/**
 * Created by umair on 01/02/17.
 */

var getSnippet = function(lang) {
  let snippets = {};
  snippets['c'] =
    '#include <stdio.h>\n' +
    'void main() {\n' +
    '    \n' +
    '}\n';

  snippets['cpp'] =
    '#include <iostream>\n' +
    'using namespace std;\n' +
    'int main() {\n' +
    '    \n' +
    '}\n';

  snippets['java'] =
    'public class Main {\n' +
    '    public static void main(String args[]) {\n' +
    '        \n' +
    '    }\n' +
    '}';

  snippets['py2'] =
    'import sys';

  return snippets[lang];
};

export default getSnippet;

/**
 * Created by umair on 01/02/17.
 */

var getSnippet = function(lang) {
  let snippets = {};
  snippets['c'] =
    '#include <stdio.h>\n' +
    'int main() {\n' +
    '    \n' +
    '}\n';

  snippets['cpp'] =
    '#include <iostream>\n' +
    'using namespace std;\n' +
    'int main() {\n' +
    '    \n' +
    '}\n';

  snippets['java'] =
    'import java.util.*;\n' +
    '\n' +
    'public class Main {\n' +
    '    public static void main(String args[]) {\n' +
    '        \n' +
    '    }\n' +
    '}';
  snippets['js'] = "console.log('we use node 10 lts');";
  snippets['py2'] =
    'import sys';
  snippets['py3'] =
    'print ("Hello, World")';
  snippets['csharp'] = `using System;
  public class Test
  {
      public static void Main()
      {
							
      }
  }`;
  return snippets[lang];
};

export default getSnippet;

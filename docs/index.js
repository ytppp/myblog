import xlsx from 'xlsx';
import readline from 'readline';
import path from 'path';
import fs from 'fs';

const LangXlsxDir = path.resolve(path.resolve(), 'docs');
const LangXlsxTitle = 'lang.xlsx';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function excel2json(excel, trans) {
  // 加载excel表格
  const { Sheets, SheetNames } = xlsx.readFile(excel, {});
  SheetNames.forEach((name) => {
    let result = {};
    let lang_list = [];

    const sheet = Sheets[name];
    const range = xlsx.utils.decode_range(sheet['!ref']);

    // 生成语种列表
    for (let col = range.s.c; col <= range.e.c; col++) {
      // 排除 key
      if (col > 0) {
        const cellAddr = xlsx.utils.encode_cell({ r: 0, c: col });
        if (sheet[cellAddr]?.v) {
          const lang = sheet[cellAddr]?.v;
          lang_list.push(lang);
          result[lang] = {};
        }
      }
    }

    // 生成翻译结果，保存在 result 中
    for (let row = range.s.r; row <= range.e.r; row++) {
      if (row > 0) {
        lang_list.forEach((lang, i) => {
          let key = sheet[xlsx.utils.encode_cell({ r: row, c: 0 })]?.v;
          let val = sheet[xlsx.utils.encode_cell({ r: row, c: i + 1 })]?.v;
          if (val) {
            result[lang][key] = val;
          }
        });
      }
    }
    save_json_file(name, trans, lang_list, result);
  });
  console.log('转换成功');
}

function save_json_file(customer, trans, lang_list, result) {
  const customer_dir = path.resolve(trans, `${customer}`);
  if (!fs.existsSync(customer_dir)) {
    fs.mkdirSync(customer_dir, { recursive: true });
  }
  lang_list.forEach((lang) => {
    const langPath = path.join(customer_dir, `${lang}.json`);
    fs.writeFileSync(
      langPath,
      JSON.stringify(result[lang], null, 2)
    );
    console.log(`已转换${langPath}`);
  });
}

console.log('=== excel翻译文件转json工具 ===');
console.log('\n');
console.log('规则:');
console.log('1. 翻译文件必须是.xlsx格式的文件');
console.log('2. 可以不填写翻译文件所在的路径，默认docs目录下的lang.xlsx');
console.log(
  '3. 若填写翻译文件所在的路径，可以是绝对路径或相对路径。可以不填写翻译文件名，默认lang.xlsx'
);
console.log(
  '4. 可以不填写翻译文件输出路径，默认docs目录'
);
console.log('5. 若填写翻译文件输出路径，可以是绝对路径或相对路径');
console.log(
  '6. 翻译文件输出路径在指定文件夹的trans目录下'
);
console.log('\n');

rl.question(`请输入翻译文件所在的路径：`, (excel) => {
  rl.question(`请输入翻译文件输出路径: `, (trans) => {
    let excel_path = '';
    let trans_path = 'trans';

    if (!excel) {
      excel = LangXlsxDir;
    }
    if (excel && excel.includes('.xlsx') && !excel.endsWith('.xlsx')) {
      console.log('翻译文件必须是.xlsx格式的文件');
      rl.close();
      return;
    }
    if (path.isAbsolute(excel)) {
      excel_path = excel.endsWith('.xlsx')
        ? excel
        : path.resolve(excel, LangXlsxTitle);
    } else {
      excel_path = path.resolve(
        LangXlsxDir,
        excel.endsWith('.xlsx') ? excel : path.join(excel, LangXlsxTitle)
      );
    }

    if (!trans) {
      trans_path = path.resolve(LangXlsxDir, trans_path);
    } else {
      if (path.isAbsolute(trans)) {
        trans_path = path.resolve(trans, trans_path);
      } else {
        trans_path = path.resolve(LangXlsxDir, trans, trans_path);
      }
    }
    excel2json(excel_path, trans_path);
    rl.close();
  });
});

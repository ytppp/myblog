const xlsx = require("xlsx");
const readline = require('readline');
const path = require('path');
const fs = require('fs');

const LangXlsx = 'lang.xlsx';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function excel2json(excel, trans) {
  // 加载excel表格
  const { Sheets, SheetNames } = xlsx.readFile(excel,{});
  SheetNames.forEach(name => {
    result = {};
    lang_list = [];

    const sheet = Sheets[name];
    const range = xlsx.utils.decode_range(sheet['!ref']);

    // 生成语种列表
    for (let col = range.s.c; col <= range.e.c; col++) {
      // 排除 key
      if (col > 0) {
        const cellAddr = xlsx.utils.encode_cell({ r: 0, c: col });
        if (sheet[cellAddr]?.v) {
          const lang = sheet[cellAddr]?.v;
          lang_list.push(lang)
          result[lang] = {}
        }
      }
    }

    for (let row = range.s.r; row <= range.e.r; row++) {
      if (row > 0) {
        for (let i = 0; i < lang_list.length; i++) {
          key = sheet[xlsx.utils.encode_cell({ r: row, c: 0 })]?.v;
          val = sheet[xlsx.utils.encode_cell({ r: row, c: i + 1 })]?.v;
          if (val) {
            const lang = lang_list[i];
            result[lang][key] = val;
          }
        }
      }
    }
    save_json_file(name, trans, lang_list, result)  
  })
}

function save_json_file(customer, trans, lang_list, result) {
  const customer_dir = path.resolve(trans, `${customer}`);
  if (!fs.existsSync(customer_dir)) {
    fs.mkdirSync(customer_dir, { recursive: true });
  }
  for(let i = 0; i < lang_list.length; i++) {
    const lang = lang_list[i];
    fs.writeFileSync(path.join(customer_dir, `${lang}.json`), JSON.stringify(result[lang], null, 2));
  }
}

rl.question(`请输入 excel 文件所在的路径（支持相对路径，不填写则默认当前文件夹。）：`, (excel) => {
  rl.question(`请输入翻译文件输出路径（不填写则默认当前文件夹）：`, (trans) => {
    let excel_path = '';
    let trans_path = 'trans';

    if (!excel) {
      excel = __dirname;
    }
    if (path.isAbsolute(excel)) {
      excel_path = excel.endsWith('.xlsx') ? excel : path.resolve(excel, LangXlsx);
    } else {
      excel_path = path.resolve(__dirname, excel.endsWith('.xlsx') ? excel : path.join(excel, LangXlsx));
    }

    if (!trans) {
      trans = __dirname;
    }
    if (!path.isAbsolute(trans)) {
      trans_path = path.resolve(__dirname, trans);
    }
    excel2json(excel_path, trans_path);
    rl.close();
  });
});

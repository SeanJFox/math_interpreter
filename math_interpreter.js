const doMath = expression => {
  let reg = /([-+/*]+)|(\d+\.\d+|\d+|\d+)/g;
  let expr = expression.replace(RegExp('--', 'g'), '+');
  let arr = expr.match(reg);
  arr = arr.map((x, i, a) => {
    if (x[1] === '-') {
      a[i+1]*= -1;
      return x[0];
    } 
    return x[1] === '+' ? x[0] : x;
  });
  if (arr[0] === '-' || arr[0] === '+') arr = ['0'].concat(arr);
  for (s of ['/','*','-','+']) {
    while (Boolean(~arr.indexOf(s))) {
      let i = arr.indexOf(s);
      let x = parseFloat(arr[i - 1]);
      let y = parseFloat(arr[i + 1]);
      let result;
      if (s === '*') result = x * y;
      if (s === '/') result = x / y;
      if (s === '+') result = x + y;
      if (s === '-') result = x - y;
      arr = arr.slice(0, i - 1).concat([result]).concat(arr.slice(i + 2, arr.length));
    };
  };
  return arr[0];
};

const calc = expression => {
  let reg = RegExp(/(\(([^(|)]+)\))+/, "g");
  let expr = expression.replace(/ /g, '');
  while (expr.search(reg) !== -1) {
    expr = expr.replace(reg, (match, _, p2) => isNaN(p2) ? doMath(p2) : p2);
  };
  return parseFloat(doMath(expr));
};
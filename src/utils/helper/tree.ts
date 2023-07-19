export const flatJsonTree  = (data) => {
  let res = []
  for (const item of data) {
    const { children, ...rest } = item
    if (children && children.length) {
      res = res.concat(flatJsonTree(children))
    }
    // @ts-ignore
    res.push(rest)
  }
  return res
}


export const treeQueryByKey = (tree, key, val) => {
  let stark = [];
  stark = stark.concat(tree);
  while(stark.length) {
      var temp = stark.shift() as any;
      if(temp.children) {
          stark = stark.concat(temp.children);
      }
      if(temp[key] === val) {
          return temp;
      }
  }
}
 
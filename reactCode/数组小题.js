var a = [1,2,3,4]
var b = [0,2]

a.filter((item,index)=>{
  return !b.includes(index)
})
(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var s=t(1),c=t.n(s),r=t(14),a=t.n(r),u=t(4),o=t(3),i=t.n(o),j="/api/persons",b=function(){return i.a.get(j).then((function(e){return e.data}))},d=function(e){return i.a.post(j,e).then((function(e){return e.data}))},m=function(e){return i.a.delete("".concat(j,"/").concat(e)).then((function(e){return e.data}))},l=function(e,n){return i.a.put("".concat(j,"/").concat(e),n).then((function(e){return e.data}))},f=t(0),h=function(e){var n=new RegExp("".concat(e.filter),"i");return e.person.name.match(n)?Object(f.jsxs)("div",{children:[e.person.name," ",e.person.number,Object(f.jsx)("button",{onClick:function(){window.confirm("Are you sure?")&&m(e.person.id).then((function(n){e.setPersons(e.persons.filter((function(n){return n.name!==e.person.name})))}))},children:"Delete"})]}):""},O=function(e){var n=e.persons,t=n.find((function(n){return n.name===e.name})),s={name:e.name,number:e.number};return Object(f.jsxs)("form",{onSubmit:function(c){c.preventDefault(),t?window.confirm("Name already exists. Replace number?")&&l(t.id,s).then(e.setPersons(n.map((function(n){return n.name===e.name?s:n})))).catch((function(n){e.setMessage("".concat(s.name," has already been deleted!")),setTimeout((function(){e.setMessage(null)}),5e3)})):d(s).then((function(t){e.setPersons(n.concat(s)),e.setMessage("Added ".concat(s.name)),e.setNewName(""),e.setNewNumber("")})).catch((function(n){e.setMessage(n),setTimeout((function(){e.setMessage(null)}),5e3)}))},children:[Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{children:["name: ",Object(f.jsx)("input",{value:e.name,onChange:function(n){return e.setNewName(n.target.value)}})]}),Object(f.jsxs)("div",{children:["number: ",Object(f.jsx)("input",{value:e.number,onChange:function(n){return e.setNewNumber(n.target.value)}})]})]}),Object(f.jsx)("div",{children:Object(f.jsx)("button",{type:"submit",children:"add"})})]})},p=function(e){return Object(f.jsx)("input",{value:e.newFilter,onChange:function(n){return e.setNewFilter(n.target.value)}})},x=function(e){var n=e.message;return""===n?null:Object(f.jsx)("div",{className:"notification",children:n})},v=function(){var e=Object(s.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],r=Object(s.useState)(""),a=Object(u.a)(r,2),o=a[0],i=a[1],j=Object(s.useState)(""),d=Object(u.a)(j,2),m=d[0],l=d[1],v=Object(s.useState)(""),w=Object(u.a)(v,2),N=w[0],g=w[1],M=Object(s.useState)(""),S=Object(u.a)(M,2),k=S[0],P=S[1];return Object(s.useEffect)((function(){b().then((function(e){return c(e)}))}),[]),Object(f.jsxs)("div",{children:[Object(f.jsx)("h2",{children:"Phonebook"}),Object(f.jsx)(x,{message:k}),Object(f.jsxs)("div",{children:["Filter:",Object(f.jsx)(p,{newFilter:N,setNewFilter:g})]}),Object(f.jsx)("h2",{children:"Add New"}),Object(f.jsx)(O,{name:o,number:m,persons:t,setMessage:P,setNewName:i,setNewNumber:l,setPersons:c}),Object(f.jsx)("h2",{children:"Numbers"}),t.map((function(e){return Object(f.jsx)(h,{person:e,filter:N,persons:t,setPersons:c},e.name)}))]})};t(38);a.a.render(Object(f.jsx)(c.a.StrictMode,{children:Object(f.jsx)(v,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.db3da674.chunk.js.map
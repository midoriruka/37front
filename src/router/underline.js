import Login from "@/page/underTheLine/login";
import UserList from "@/page/underTheLine/userlist";
import UserEdit from "@/page/underTheLine/useredit";

const underline = [
  {
    path: "/underline/login",
    name: "登陆",
    component: Login
  },
  {
    path: "/underline/userlist",
    name: "客户列表",
    component: UserList
  },
  {
    path: "/underline/useredit",
    name: "资料编辑",
    component: UserEdit
  },
];

export default underline;

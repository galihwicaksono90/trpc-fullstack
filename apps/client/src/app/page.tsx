"use client"
import RoleList from "@/components/RoleList"
// import CreateRoleForm from "@/components/CreateRoleForm"
import CreateUserForm from "@/components/CreateUserForm";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row p-24" >
      <div className="pr-10">
        <h1>Users</h1>
        <CreateUserForm />
      </div>
      <div>
        <h1 className="mt-20">roles</h1>
        <RoleList />
      </div>
      <LoginForm />
    </main>
  );
}

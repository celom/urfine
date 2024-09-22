import LoginForm from '../../../components/loginForm';
import Logo from '../../../components/logo';

export default async function Page() {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-gradient-to-br from-[#266674] to-[#124856] p-24">
      <div className="flex flex-col items-center gap-8 rounded-lg bg-white px-5 py-10">
        <Logo className="" />
        <LoginForm className="w-64" />
      </div>
    </div>
  );
}

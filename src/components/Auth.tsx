import { useForm } from "react-hook-form";
import supabase from "../lib/supabase";

export default function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function signIn(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
    });

    console.log('email', email, 'data', data, 'error', error)

    return data;
  }

  const onSubmit = handleSubmit(async (data) => {
    await signIn(data["email"]);
    alert(
      "ログインメールを送りました。メール内のリンクからログインしてください。"
    );
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="pjord.svg" alt="logo" />
          Fjord Agent
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              ログイン
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.email ? "border-rose-600 border-1" : ""
                  }`}
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", { required: "入力してください" })}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                ログインメールを送る
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

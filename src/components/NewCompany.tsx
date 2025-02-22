import { useForm } from 'react-hook-form'
import supabase from '../lib/supabase'
import { useRouter } from 'next/router'

type Input = {
  name: string
  website: string
}

export default function NewCompany() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Input>()

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)

    const { error } = await supabase.from('companies').insert(data)
    console.log(error)
    reset()
    router.push('/companies')
  })

  return (
    <div className="bg-white">
      <section className="py-6 px-4 mx-auto max-w-2xl">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 pb-6">
          新規企業追加
        </h1>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                企業名
              </label>
              <input
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                  errors.name ? 'border-rose-600 border-1' : ''
                }`}
                type="text"
                placeholder="株式会社ロッカ"
                {...register('name', { required: '入力してください' })}
              />
              <p>{errors.name?.message}</p>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="website"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                WebサイトURL
              </label>
              <input
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                  errors.website ? 'border-rose-600 border-1' : ''
                }`}
                type="text"
                placeholder="https://lokka.jp"
                {...register('website', { required: '入力してください' })}
              />
              <p>{errors.website?.message}</p>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="memo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                メモ
              </label>
              <textarea
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="メモ…"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            追加
          </button>
        </form>
      </section>
    </div>
  )
}

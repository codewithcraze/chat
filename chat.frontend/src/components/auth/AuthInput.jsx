export default function AuthInput({
  name,
  type,
  placeholder,
  register,
  error,
}) {
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor={name} className="text-sm text-2xl font-bold tracking-wide">
        {placeholder}
      </label>
      <input
        className="w-full dark:bg-dark_bg_3 text-base py-4 border px-4 outline-none"
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}

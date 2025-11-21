interface TailInputProps {
  type: string,
  name: string,
  ref: React.RefObject<HTMLInputElement>
}

export default function TailInput({type, name, ref} : TailInputProps) {
  return (
    <div className='w-full'>
      <input type={type} name={name}
                ref={ref}
                className='block w-full h-12 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
      
      </input>
    </div>
  )
}

export const HeaderLogo = () => {
  return (
    <a href='/'>
      <div className='items-center hidden lg:flex'>
        <img src='/logo.svg' alt='Logo' width={28} height={28} />
        <p className='font-semibold text-white text-2xl ml-2.5'>
          Falcon
        </p>
      </div>
    </a>
  )
}
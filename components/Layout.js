import Header from './Header'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='layout'>
        {children}
      </div>
    </>
  )

}

export default Layout

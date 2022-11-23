import Header from './Header'
// Fonts
import { Urbanist } from '@next/font/google'

const urbanist = Urbanist({ subsets: ['latin'] })

const Layout = ({ children }) => {
  return (
    <div className={urbanist.className}>
      <Header />
      <div className='layout'>
        {children}
      </div>
    </div>
  )

}

export default Layout

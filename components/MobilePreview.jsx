import LinksScreen from '@/components/LinksScreen'
import { memo, useEffect } from 'react'


const MobilePreview = () => {

    // fix this

    return (
        <div className='absolute z-50 flex justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:shadow-md hover:shadow-[#ddd6f3]'>
            <LinksScreen />
        </div>

    )
}

export default MobilePreview
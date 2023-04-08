


import React from 'react'
        // // your current rank is .. It was Rank previously
const Rank = ({name,entries}) =>{
        return (
            <div>
                <div className='white f3'>
                    {`${name} , your current entry count...`} 
                </div>
                <div className='white f1'>
                    {`${entries}`}
                </div>
            </div>
        )
            
}

export default Rank
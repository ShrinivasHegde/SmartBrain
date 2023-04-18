

import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange,onButtonSubmit}) =>{
        return (
            <div>
                <p className='f3 fw6'>  {'This magic will detect the face in your picture'}
                </p>
                <div className='center' >
                    <div className='form center w-60 pa4 br3 shadow-5'>
                        <input className='f4 pa2 w-70 center ' 
                               type='text' 
                               onChange={onInputChange} 
                        /> 
                        <button className='w-30 grow f4 link ph3 pv2 dib black bg-light-red ml2' 
                                onClick={onButtonSubmit}>
                                Detect
                        </button>
                    </div>
                    
                </div>
            </div>
        )
            
}

export default ImageLinkForm
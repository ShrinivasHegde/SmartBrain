
import React from 'react'
import Tilt from 'react-parallax-tilt';
import FDLogo from './FDLogo.png'
import './Logo.css'
const Logo = () =>{
        return (
            <div className='ma4 mt0'>
                <Tilt className='Tilt br2 shadow-2 ml4'  style={{height:100, width:100}}>
                        <div>
                            <img className='Img' alt='Logo' src={FDLogo} />
                        </div>
                </Tilt>
            </div>
        )
            
}

export default Logo











/*
<Tilt ClassName='Tilt br4 ' options={{max:150}} style={{height:150, width:150 }}>
                    <div style={{ height: '150px',width:'150px',  backgroundColor: 'darkgreen' , display:'flex', justifyContent:'center'}}>
                        <h1>React Parallax Tilt 👀</h1>
                    </div>
                </Tilt>

*/
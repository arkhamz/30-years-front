import {animated,useSpring} from "react-spring"

function SpringFade({children, className}){

    const props = useSpring({to: {opacity: 1}, from: {opacity:0},delay:100 });

    return <animated.div className={className} style={props}>
        {children}

    </animated.div>

}

export default SpringFade;
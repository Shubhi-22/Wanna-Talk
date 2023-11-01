import { Route, Routes} from "react-router-dom";
import Homepage from './Homepage';
import Chatpage from './ChatPage';
// import ChatProvider from "../Context/ChatProvider";
// import ScrollToTop from "./ScrollToTop";

const Routing=()=>{
    return<>
         {/* <ScrollToTop /> */}
        <Routes>
        
        <Route path='/' Component={Homepage}/>
        <Route path='/chats' Component={Chatpage}/>  
        
        </Routes>
        </>
}

export default Routing;
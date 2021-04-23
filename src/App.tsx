import { User } from 'classes/User';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './styleResponsive.css'
import { DisplayConversation } from './DisplayConversation';
import { Home } from './Home';

const App = () => {
  const [userContext, setUserContext] = useState<User>();
  const [statusNotification, setStatusNotification] = useState<string>();


  const onRegister = (valueInput:string) => {
    const user = new User();
    user.name = valueInput;
    user.isActive = true;
    user.id = Math.floor(Math.random() * 1000) + 1
    localStorage.setItem('Users', JSON.stringify([user]))
    setUserContext(user)
  }
  const getUserActive = () => {
    const users: User[] = JSON.parse(localStorage.getItem('Users')!)
    return users ? users.find(user => user.isActive === true) : null
  }

  useEffect(() => {
    const user = getUserActive();
    if (!user) { return }
    setUserContext(user)


    Notification.requestPermission((status) => {
      setStatusNotification(status)
    });


  }, [])




  return (
    <div className="react-app-postman" >
      <h1> New Postman</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/conversations/:receiverId"><DisplayConversation userActive={userContext} statusNotification={statusNotification} /></Route>
          <Route path="/"><Home statusNotification={statusNotification} onRegister={onRegister} userContext={userContext} /></Route>
        </Switch>
      </BrowserRouter>

    </div >
  );
}

export default App;

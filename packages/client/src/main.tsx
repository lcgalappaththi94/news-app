import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ArticleContextProvider} from "./store/AppContextProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ArticleContextProvider>
            <App/>
        </ArticleContextProvider>
    </StrictMode>,
)

import { useCallback, useEffect, useState } from "react";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import { useDispatch } from "react-redux";
import { $GET } from "./api";
import { setData } from "./redux/slices/todos.slice";

function App() {
    const [hideDone, setHideDone] = useState(false);
    const dispatch = useDispatch();

    const get = useCallback(async () => {
        try {
            const { data } = await $GET("/todos");
            dispatch(setData(data));
        } catch (err) {
            console.error(err.message);
        }
    });

    const changeHideDone = () => {
        setHideDone(() => !hideDone);
    };

    useEffect(() => {
        get();
    }, []);

    return (
        <>
            <Header changeHideDone={changeHideDone} hideDone={hideDone} />
            <Main hideDone={hideDone} get={get} />
        </>
    );
}

export default App;

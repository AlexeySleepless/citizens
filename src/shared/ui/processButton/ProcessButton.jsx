import { Button, Spin } from "antd"

export const ProcessButton = (
    {
        isLoading,
        ...props
    }
) => {
    if(isLoading){
        return <Spin/>;
    }

    return(
        <Button {...props}>Сохранить</Button>
    );
}
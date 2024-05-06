const Notification =(props) => {
    if(props.message === null) {
        return null
    }

    if (props.code === "1") {
        return (
            <div className="error">
                {props.message}
            </div>
        )
    }

    if (props.code === "2") {
        return (
            <div className="success">
                {props.message}
            </div>
        )
    }
}

export default Notification
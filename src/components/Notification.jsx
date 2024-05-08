import PropTypes from 'prop-types'

const Notification =(props) => {
    if(props.message === "") {
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

Notification.propTypes = {
    code: PropTypes.string.isRequired
}

export default Notification
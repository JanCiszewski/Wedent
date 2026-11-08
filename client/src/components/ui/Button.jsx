export function Button({children, variant = "primary", onClick, type = "button", shape = "rounded"}) {
    return <button type={type} className={`btn btn-${variant} btn-${shape}`} onClick={onClick} >{children}</button> 
}

export function ButtonLink({children, variant = "primary", href = "#", shape = "rounded"}) {
    return <a href={href} className={`btn btn-${variant} btn-${shape}`}>{children}</a>
}
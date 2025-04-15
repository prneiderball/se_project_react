function Header() {
    const getDate = () => {
        const date = new Date();
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <header className="header">
            <img className="header__logo" src="./src/assets/wtwrlogo.svg" alt="wtwr logo" />
            <p className="header__date">{getDate()}, (location)</p>
            <button className="header__addclothes--btn">+ Add Clothes</button>
            <div className="header__user--container">
            <p>Terrence Tegegne</p>
            <img src="./src/assets/defaultavatar.svg" alt="" />
            </div>
        </header>
    );
}

export default Header;
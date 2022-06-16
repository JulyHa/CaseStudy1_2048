class cell{
    _value
    _x
    _y
    constructor(value, x, y) {
        this._value = value;
        this._x = x;
        this._y = y;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }
}
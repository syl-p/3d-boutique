export default function ColorPicker({ position, selectedColor, colors, choiceCallback }) {
    return <div className="color" style={{ position: "absolute", left: `calc(50% + ${position[0]}px)`, bottom: `calc(50% + ${position[1]}px)` }}>
        <div className="color-selected" style={{ backgroundColor: colors[selectedColor] }}></div>
        <ul className="color-choices">
            {colors.map((x, i) =>
                <li key={i}>
                    <button onClick={() => choiceCallback(i)} style={{ backgroundColor: x }}>
                        <span>{x}</span>
                    </button>
                </li>
            )}
        </ul>
    </div>
}

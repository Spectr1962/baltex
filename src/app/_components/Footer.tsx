export function Footer() {
    return (
        <footer style={{
            padding: "2rem 1rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            marginTop: "4rem",
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "0.875rem"
        }}>
            <p>&copy; {new Date().getFullYear()} Baltex. Все права защищены.</p>
        </footer>
    );
}

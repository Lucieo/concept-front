import React from "react";

const styles = {
  red: { color: "#E42343" },
  orange: { color: "#EE6402" },
  yellow: { color: "#F7B030" },
  green: { color: "#1EBE8B" },
  blue: { color: "#197D9E" },
};

export default function Sloggan() {
  return (
    <>
      <span style={styles.red}>N</span>
      <span style={styles.orange}>o</span>
      <span style={styles.yellow}>n</span>
      &nbsp;
      <span style={styles.green}>j</span>
      <span style={styles.blue}>e</span>
      &nbsp;
      <span style={styles.red}>v</span>
      <span style={styles.orange}>o</span>
      <span style={styles.yellow}>i</span>
      <span style={styles.green}>s</span>
      &nbsp;
      <span style={styles.blue}>p</span>
      <span style={styles.red}>a</span>
      <span style={styles.orange}>s</span>
      &nbsp;
      <div>
        <span style={styles.blue}>f</span>
        <span style={styles.red}>r</span>
        <span style={styles.orange}>a</span>
        <span style={styles.yellow}>n</span>
        <span style={styles.green}>c</span>
        <span style={styles.blue}>h</span>
        <span style={styles.red}>e</span>
        <span style={styles.orange}>m</span>
        <span style={styles.yellow}>e</span>
        <span style={styles.green}>n</span>
        <span style={styles.blue}>t</span>
        <span style={styles.blue}>.</span>
        <span style={styles.red}>.</span>
        <span style={styles.orange}>.</span>
      </div>
      &nbsp;
    </>
  );
}

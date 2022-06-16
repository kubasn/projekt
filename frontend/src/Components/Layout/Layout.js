import style from "./Layout.module.css";
export default function Layout(props) {
  return (
    <div>
      <div className={style.spaces}>
        {props.header}
        {props.menu}
        {props.content}
      </div>
      {props.footer}
    </div>
  );
}

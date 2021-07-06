
import s from './FormControls.module.css'



export const Textarea=({input,meta:{touched,error},...props})=>{
    const hasError =touched &&error;
    return(
        <div className={s.formControl+' '+(hasError? s.error:'')}>
            <div>
                <textarea {...input}{...props} />
            </div>
            <div>
                { hasError && <span>{error}</span>}
            </div>

        </div>
    )
}
export const Input=({input,meta:{touched,error},...props})=>{
    const hasError = touched &&error;
    return(
        <div className={s.formControl+' '+(hasError? s.error:'')}>
            <div>
                <input {...input}{...props} />
            </div>
            <div>
                { hasError && <span>{error}</span>}
            </div>

        </div>
    )
}
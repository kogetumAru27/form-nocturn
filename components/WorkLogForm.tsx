"use client";
import { WorkType } from "@/app/generated/prisma";
import { useReducer } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { CreateWorkLogInput } from "@/actions/worklog";
type CreateState = {
    date:string,
    workType:WorkType,
    note:string,
    weather:string,
    quanitity:number| null,
    unit:string,
    duration:number | null,
    cropId:string,
    image:string | null,
    isOpen:boolean,
    error:string
}
type Crop = {
    id:string,
    name:string
}
type WorkLogFormProps = {
    crops: Crop[];
    initialData?:CreateWorkLogInput;
    onSubmit:(input:CreateWorkLogInput) => Promise<{success?:boolean,error?:string}>
    title:string;
    buttonLabel:string
}
const initialState:CreateState = {
    date:"",
    workType:"SEEDING",
    note:"",
    weather:"",
    quanitity:null,
    unit:"",
    duration:null,
    cropId:"",
    image:"",
    isOpen:false,
    error:""
}
type Action =   {type:"SET_DATE",payload:string} 
                |{type:"SET_WORKTYPE",payload:WorkType} 
                |{type:"SET_NOTE",payload:string}
                |{type:"SET_WEATHER",payload:string}
                |{type:"SET_QUANITITY",payload:number | null}
                |{type:"SET_UNIT",payload:string}
                |{type:"SET_DURATION",payload:number | null}
                |{type:"SET_CROPID",payload:string}
                |{type:"SET_ISOPEN"}
                |{type:"SET_ERROR",payload:string}
                |{type:"SET_IMAGE",payload:string | null}
                |{type:"RESET"}
function redcur(state:typeof initialState,action:Action){
    switch(action.type){
        case "SET_DATE": return {...state,date:action.payload};
        case "SET_WORKTYPE":return {...state,workType:action.payload};
        case "SET_NOTE": return {...state,note:action.payload};
        case "SET_WEATHER": return{...state,weather:action.payload};
        case "SET_QUANITITY": return{...state,quanitity:action.payload};
        case "SET_UNIT": return{...state,unit:action.payload};
        case "SET_DURATION": return{...state,duration:action.payload};
        case "SET_CROPID": return{...state,cropId:action.payload};
        case "SET_IMAGE": return{...state,image:action.payload};
        case "SET_ISOPEN": return{...state,isOpen:!state.isOpen};
        case"SET_ERROR":   return{...state,error:action.payload};
        case "RESET"  : return initialState
        default: return state;
    }
}
export default function WorkLogForm({crops,initialData,onSubmit,title,buttonLabel}:WorkLogFormProps){
    const [state,dispatch] = useReducer(redcur,initialData ?{...initialData,error:"",isOpen:false}:initialState);
    return(
        <div>
            <button onClick={() => dispatch({type:"SET_ISOPEN"})}>{title}</button>
            {state.isOpen && (
                <>
                <div 
                className="fixed inset-0 bg-black/50 z-40" 
                onClick={() => dispatch({ type: "SET_ISOPEN" })} 
              />
              <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-8 rounded-2xl w-[480px] flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
                <form onSubmit={async(e) => {
                  e.preventDefault();
                  if(!state.date){
                    dispatch({ type: "SET_ERROR", payload: "日付を入力してください" });
                    return;
                  }
                  if(!state.cropId){
                    dispatch({ type: "SET_ERROR", payload: "作物を選択してください" });
                    return;
                  }
                  const input: CreateWorkLogInput = {
                    date:state.date,
                    workType: state.workType,
                    note: state.note,
                    weather: state.weather,
                    quanitity: state.quanitity,
                    unit: state.unit,
                    duration: state.duration,
                    cropId: state.cropId,
                    image: state.image,
                  }
                
                  const result = await onSubmit(input);
                  if(result?.success) dispatch({type:"RESET"})
                  if(result?.error) dispatch({ type: "SET_ERROR", payload: result.error });
                }} className="flex flex-col gap-4">
                  <input 
                    type="date" 
                    value={state.date} 
                    onChange={(e) => dispatch({ type: "SET_DATE", payload: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <select 
                    value={state.workType} 
                    onChange={(e) => dispatch({ type: "SET_WORKTYPE", payload: e.target.value as WorkType })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="SEEDING">種まき</option>
                    <option value="TRANSPLANT">定植</option>
                    <option value="WATERING">水やり</option>
                    <option value="FERTILIZING">施肥</option>
                    <option value="WEEDING">草取り</option>
                    <option value="PESTICIDE">防除</option>
                    <option value="HARVESTING">収穫</option>
                    <option value="OTHER">その他</option>
                  </select>
                <CldUploadWidget uploadPreset="farm-nocturn" onSuccess={(result) => {
                    const info = result.info as {secure_url:string}
                    dispatch({type:"SET_IMAGE",payload:info.secure_url});
                }}>{({open}) => <button type="button" onClick={() => open()} className="border border-green-700 text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition w-full"> 📷 画像をアップロード</button>}</CldUploadWidget>
                  <select 
                    value={state.weather} 
                    onChange={(e) => dispatch({ type: "SET_WEATHER", payload: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="">天気を選択</option>
                    <option value="晴れ">☀️ 晴れ</option>
                    <option value="曇り">☁️ 曇り</option>
                    <option value="雨">🌧️ 雨</option>
                    <option value="雪">❄️ 雪</option>
                    <option value="強風">💨 強風</option>
                  </select>
                  <select 
                    onChange={(e) => dispatch({ type: "SET_CROPID", payload: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="">作物を選択</option>
                    {crops.map(crop => (
                      <option key={crop.id} value={crop.id}>{crop.name}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="number"
                      min={0} 
                      value={state.quanitity ?? ""} 
                      placeholder="収穫量" 
                      onChange={(e) => dispatch({ type: "SET_QUANITITY", payload: e.target.value ? Number(e.target.value) : null })}
                      className="border border-gray-300 rounded-lg px-4 py-2 w-2/3"
                    />
                    <input 
                      type="text" 
                      value={state.unit} 
                      placeholder="単位(kg,gなど)" 
                      onChange={(e) => dispatch({ type: "SET_UNIT", payload: e.target.value })}
                      className="border border-gray-300 rounded-lg px-4 py-2 w-1/3"
                    />
                  </div>
                  <input 
                    type="number" 
                    placeholder="作業時間（分）" 
                    value={state.duration ?? ""} 
                    onChange={(e) => dispatch({ type: "SET_DURATION", payload: e.target.value ? Number(e.target.value) : null })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <textarea 
                    placeholder="メモ" 
                    value={state.note} 
                    onChange={(e) => dispatch({ type: "SET_NOTE", payload: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none"
                  />
                  {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => {dispatch({ type: "SET_ISOPEN" }); dispatch({type:"RESET"})}}
                      className="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                    >
                      キャンセル
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
                    >
                    {buttonLabel}
                    </button>
                  </div>
                </form>
              </div>
            </>
            )}
        </div>
    )
}


import {Button} from 'antd';
export default function ErrorHandler({error, resetErrorBoundary}){
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-3">
            <h1 className={'text-3xl'}>Something went wrong</h1>
            <Button className={'rounded-xl'} type={'primary'} onClick={resetErrorBoundary}>Try Again</Button>
            <div className={'p-2 rounded-xl border border-solid border-slate-100 mt-6 flex flex-col gap-2'}>
                <p className={'text-center'}>Detailed Error Info</p>
                <pre style={{color: 'red'}}>{error.message}</pre>
            </div>
        </div>
    )
}
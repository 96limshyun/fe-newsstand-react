export const getCurrentDate = () => {
    const DAYS = ["일", "월", "화", "수", "목", "금", "토"]
    const date = new Date();
    return (
        <div className="flex items-center">
            {date.getFullYear()}. {date.getMonth() + 1}. {date.getDate()}. {DAYS[date.getDay()]}요일
        </div>
    );
};

export const reloadPage = () => window.location.reload();

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
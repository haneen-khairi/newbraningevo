//crud for bus drivers
import instance from '@/api/instance'
function GetBusDrivers(params) {
    return instance.get('busshuttle/users/drivers', { params }).then(res => res.data)
}
function CreateBusDriver(data) {
    let form = ConvertToFormData(data);
    return instance.post('Authentication/registeration/registerbusdriver', form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data)
}
function EditBusDriver(data) {
    let form = ConvertToFormData(data);

    return instance.put('busshuttle/users/' + data.id, form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data)
}
function DeleteBusDriver(id) {
    return instance.delete('busshuttle/drivers/' + id).then(res => res.data)
}

function ConvertToFormData(data) {
    let form = new FormData();
    for (let key in data) {
        if (data[key] == null || data[key] == undefined) continue;
        if(key == 'Routes') continue;
        form.append(key, data[key]);
    }
    if (data?.Routes && data.Routes.length > 0) {
        for (let index in data.Routes) {
            form.append('Routes[' + index + '].RouteId', data.Routes[index]);
            form.append('Routes[' + index + '].IsPrimary', index == 0);
        }
    }
    return form;
}
export {
    GetBusDrivers,
    CreateBusDriver,
    EditBusDriver,
    DeleteBusDriver
}
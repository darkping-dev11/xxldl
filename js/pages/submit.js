export default {
template: `

<div style="display:flex;justify-content:center;padding:60px">

<div style="
background:white;
padding:35px;
width:420px;
border-radius:12px;
box-shadow:0 4px 12px rgba(0,0,0,0.1);
">

<h2 style="text-align:center;margin-bottom:25px">Kayıt Gönder</h2>

<label>Kullanıcı adı</label> <input style="width:100%;margin:6px 0 15px;padding:8px" placeholder="Kullanıcı adınız">

<label>Seviye</label> <select style="width:100%;margin:6px 0 15px;padding:8px">

<option>Bir seviye seçin...</option>
</select>

<label>Kayıt Bağlantısı</label> <input style="width:100%;margin:6px 0 15px;padding:8px" placeholder="https://...">

<label>Ham Görüntü Bağlantısı</label> <input style="width:100%;margin:6px 0 15px;padding:8px" placeholder="https://...">

<label>Notlar</label> <input style="width:100%;margin:6px 0 15px;padding:8px" placeholder="Başka notlarınız var mı...?">

<label>Platform</label>

<div style="margin:10px 0 20px">
<label><input type="radio" name="platform"> Mobil</label>
<label style="margin-left:20px"><input type="radio" name="platform"> Bilgisayar</label>
</div>

<button style="
width:100%;
padding:10px;
background:#7fa8e8;
border:none;
border-radius:6px;
color:white;
font-weight:600;
">
Göndermek </button>

</div>

</div>
`
}


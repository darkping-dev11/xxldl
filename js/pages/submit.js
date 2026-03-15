export default {
template: `
<div class="submit-page">

<h1>Kayıt Gönder</h1>

<div class="submit-card">

<label>Kullanıcı adı</label>
<input type="text" placeholder="Kullanıcı adınız">

<label>Seviye</label>
<select>
<option>Bir seviye seçin...</option>
</select>

<label>Kayıt bağlantısı</label>
<input type="text" placeholder="https://...">

<label>Ham görüntü bağlantısı</label>
<input type="text" placeholder="https://...">

<label>Notlar</label>
<input type="text" placeholder="Başka notlarınız var mı...?">

<label>Platform</label>

<div class="platform">
<label><input type="radio" name="p"> Mobil</label>
<label><input type="radio" name="p"> Bilgisayar</label>
</div>

<button class="submit-btn">Göndermek</button>

</div>

</div>
`
}

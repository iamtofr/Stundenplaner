<script src="socket.io.js"></script> <script src="https://code.jquery.com/jquery- 1.11.1.js"></script>
    <script> $(function () {
    var socket = io();
    $('form').submit(function() { socket.emit('chat message', $('#m').val());
        $('#m').val(''); return false; });
    socket.on('chat message', function(msg) { $('#messages').append($('<li>').text(msg));
    }); });
</script>
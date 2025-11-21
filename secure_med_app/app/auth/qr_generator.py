import qrcode

qr = qrcode.QRCode()
qr.add_data("blah blah blah bleh bleh bleeeh")
qr.make()

qr.print_ascii()  # prints the QR code in the terminal
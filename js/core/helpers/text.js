function replacePolish(s) {
	return s
		.replace("Ą", "A")
		.replace("ą", "a")
		.replace("Ę", "E")
		.replace("ę", "e")
		.replace("Ś", "S")
		.replace("ś", "s")
		.replace("Ć", "C")
		.replace("ć", "c")
		.replace("Ź", "Z")
		.replace("ź", "z")
		.replace("Ń", "N")
		.replace("ń", "n")
		.replace("Ó", "O")
		.replace("ó", "o")
		.replace("Ż", "Z")
		.replace("ż", "z");
}

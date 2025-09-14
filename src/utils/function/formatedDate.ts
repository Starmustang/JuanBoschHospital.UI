const formatedDate = (date: string | Date) => {
    if (!date) return 'Fecha no disponible';
    const formattedDate = new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    return formattedDate;
}

export default formatedDate;
document.addEventListener('DOMContentLoaded', () => {
    // --- Instruction Format Visualizer ---
    const infoBox = document.getElementById('format-info-box');
    const fields = document.querySelectorAll('.format-visualizer .field');

    fields.forEach(field => {
        field.addEventListener('mouseover', () => {
            infoBox.textContent = field.getAttribute('data-info');
        });
        field.addEventListener('mouseout', () => {
            infoBox.textContent = 'Hover over a field to see its description.';
        });
    });
});

// --- Tabbed Interface for Formats ---
function openFormat(evt, formatName) {
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }

    const tabLinks = document.getElementsByClassName('tab-link');
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(' active', '');
    }

    document.getElementById(formatName).style.display = 'block';
    evt.currentTarget.className += ' active';
}

// --- Animation for lw instruction ---
function animateLw() {
    // Elements
    const addrPacket = document.getElementById('address-packet');
    const dataPacket = document.getElementById('data-packet');
    const s1Reg = document.getElementById('reg-s1');
    const t0Reg = document.getElementById('reg-t0');
    const targetMem = document.getElementById('target-mem');
    
    // Reset state
    t0Reg.textContent = 't0: ?';
    t0Reg.style.backgroundColor = '';
    targetMem.style.backgroundColor = '';
    
    // 1. Calculate address in CPU
    const s1Rect = s1Reg.getBoundingClientRect();
    const aluOp = document.getElementById('alu-op');
    const aluRect = aluOp.getBoundingClientRect();

    addrPacket.style.opacity = '0';
    addrPacket.style.transition = 'none';
    addrPacket.style.left = `${s1Rect.left}px`;
    addrPacket.style.top = `${s1Rect.top}px`;
    
    setTimeout(() => {
        addrPacket.style.opacity = '1';
        addrPacket.style.transition = 'all 1s ease-in-out';
        addrPacket.style.top = `${aluRect.top}px`;
    }, 100);

    // 2. Send address on Address Bus
    setTimeout(() => {
        const busRect = document.getElementById('address-bus').getBoundingClientRect();
        const memRect = targetMem.getBoundingClientRect();
        addrPacket.style.left = `${busRect.left + (busRect.width / 2)}px`;
        addrPacket.style.top = `${busRect.top}px`;
        setTimeout(() => {
            addrPacket.style.left = `${memRect.left}px`;
        }, 1000);
    }, 1100);

    // 3. Memory is accessed, data is put on Data Bus
    setTimeout(() => {
        addrPacket.style.opacity = '0';
        targetMem.style.backgroundColor = 'var(--accent-color)';
        
        const memRect = targetMem.getBoundingClientRect();
        dataPacket.style.opacity = '0';
        dataPacket.style.transition = 'none';
        dataPacket.style.left = `${memRect.left}px`;
        dataPacket.style.top = `${memRect.top}px`;
        
        setTimeout(() => {
            dataPacket.style.opacity = '1';
            dataPacket.style.transition = 'all 1s ease-in-out';
            const dataBusRect = document.getElementById('data-bus').getBoundingClientRect();
            dataPacket.style.left = `${dataBusRect.left + (dataBusRect.width / 2)}px`;
            dataPacket.style.top = `${dataBusRect.top}px`;
        }, 500);

    }, 3200);

    // 4. Data travels back to CPU and into register t0
    setTimeout(() => {
        const t0Rect = t0Reg.getBoundingClientRect();
        dataPacket.style.left = `${t0Rect.left}px`;
        dataPacket.style.top = `${t0Rect.top}px`;
    }, 4800);

    // 5. Finalize
    setTimeout(() => {
        dataPacket.style.opacity = '0';
        t0Reg.textContent = 't0: 1234';
        t0Reg.style.backgroundColor = 'var(--accent-color)';
        targetMem.style.backgroundColor = ''; // Reset memory color
    }, 5900);
}
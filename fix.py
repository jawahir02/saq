with open('css/home.css', 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if '.process-timeline-node {' in line:
        new_lines = lines[:i+1]
        break

css_to_add = """    height: 60px;
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 20px;
}
.process-timeline-node::after {
    content: '';
    position: absolute;
    left: 60px;
    right: -20px;
    top: 50%;
    height: 1px;
    background: var(--gold);
    z-index: 1;
}
.process-timeline-node.last::after {
    display: none;
}
.process-icon-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid var(--charcoal);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    background: #FDFBF9;
}
.process-icon-circle svg {
    width: 18px;
    height: 18px;
    stroke: var(--charcoal);
}
.process-desc {
    font-size: 0.75rem;
    color: var(--charcoal);
    padding-left: 20px;
    line-height: 1.4;
    padding-right: 15px;
}

/* 3. Approach & Values Grid */
.approach-values-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    border-top: 1px solid rgba(0,0,0,0.1);
    padding-top: 3rem;
}
.approach-text-col {
    display: flex;
    flex-direction: column;
}
.approach-bold-text {
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--navy-blue);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    margin-top: 1rem;
}
.approach-regular-text {
    font-size: 0.95rem;
    color: var(--charcoal);
    line-height: 1.6;
}

/* Values Grid Dashboard */
.values-dashboard-col {
    display: flex;
    flex-direction: column;
}
.values-2x2-grid {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid rgba(0,0,0,0.1);
    border-left: 1px solid rgba(0,0,0,0.1);
}
.dash-value-item {
    width: 50%;
    padding: 1.5rem;
    border-right: 1px solid rgba(0,0,0,0.1);
    border-bottom: 1px solid rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
.dash-value-item.centered-item {
    width: 50%;
    border-right: 1px solid rgba(0,0,0,0.1);
    border-bottom: 1px solid rgba(0,0,0,0.1);
    border-left: 1px solid rgba(0,0,0,0.1);
    margin: 0 auto;
    border-top: none; 
}
.dash-value-icon {
    margin-bottom: 1rem;
}
.dash-value-icon svg {
    width: 32px;
    height: 32px;
    stroke: var(--charcoal);
    stroke-width: 1.5;
}
.dash-value-text .dv-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 0.5rem;
}
.dv-num {
    font-family: var(--font-primary);
    font-size: 1.2rem;
    color: var(--navy-blue);
}
.dv-title {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--charcoal);
}
.dash-value-text p {
    font-size: 0.75rem;
    color: var(--charcoal);
    line-height: 1.4;
}

/* Responsive */
@media (max-width: 1024px) {
    .approach-values-grid {
        grid-template-columns: 1fr 1fr;
    }
    .approach-image {
        display: none;
    }
}
@media (max-width: 768px) {
    .mission-header-grid {
        flex-direction: column;
    }
    .process-timeline-grid {
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }
    .process-timeline-node::after {
        display: none;
    }
    .approach-values-grid {
        grid-template-columns: 1fr;
    }
    .dash-value-item, .dash-value-item.centered-item {
        width: 100%;
        border-left: none;
    }
    .values-2x2-grid {
        border-left: none;
    }
}
"""

with open('css/home.css', 'w') as f:
    f.writelines(new_lines)
    f.write(css_to_add)
